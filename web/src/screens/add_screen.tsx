import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import AsyncSelect from "react-select/async";

import YouTube from "react-youtube";
import { Dialog, Screen, ScreenHeader } from "../components";
import { PrimaryButton } from "../components/primary_button";
import { addAnswer } from "../core/answer";
import { searchPoliticians } from "../core/politician";
import { askQuestion } from "../core/question";
import { retrieveVideoId } from "../core/utils";
import "./add_screen.css";

enum CallStatus {
  Unoccured,
  Sent,
  Received,
}

const QASelector = (props: any) => {
  const history = useHistory();
  const { currentQuestion } = props.payload;

  const handleAskBtnClick = () => {
    history.push("/add/question");
  };
  const handleAnswerBtnClick = () => {
    history.push("/add/answer", { currentQuestion });
  };
  // const handlePoliticianBtnClick = () => {
  //   history.push("/add/politician");
  // };
  return (
    <div className="add-dialog">
      <Dialog>
        <div>
          <h1>You can</h1>
        </div>
        <div>
          <PrimaryButton
            label="Ask a question"
            icon={faArrowRight}
            onClick={handleAskBtnClick}
          />
        </div>
        {currentQuestion && (
          <div>
            <PrimaryButton
              label="Add an answer"
              icon={faArrowRight}
              onClick={handleAnswerBtnClick}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

const AskQuestionDailog = () => {
  const history = useHistory();
  const [questionText, setQuestionText] = useState("");
  const [callStatus, setCallStatus] = useState(CallStatus.Unoccured);

  const handleTextInputChange = (evt: any) => setQuestionText(evt.target.value);
  return (
    <div className="add-dialog">
      <Dialog>
        <div>
          <h1>Ask New Policy Question</h1>
        </div>
        <div>
          <p>Any candidate can answer this question</p>
        </div>
        <textarea
          className="add-text-area"
          rows={5}
          placeholder={"What's on your mind?"}
          onChange={handleTextInputChange}
        />
        {questionText.length > 0 && questionText.length <= 150 && (
          <div>
            <PrimaryButton
              label={
                callStatus == CallStatus.Sent
                  ? "Please wait..."
                  : "Post question"
              }
              icon={faArrowRight}
              onClick={async () => {
                setCallStatus(CallStatus.Sent);
                await askQuestion(questionText);
                setCallStatus(CallStatus.Received);
                if (history.length > 1) {
                  history.goBack();
                } else {
                  history.push("/");
                }
              }}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};

interface PoliticianSelectOption {
  value: string;
  label: string;
}

const AddAnswerLinkDialog = ({ location }: any) => {
  const [ytLink, setYtLink] = useState("");
  useState<PoliticianSelectOption>();
  const [currentPolitician, setCurrentPolitician] = useState({
    value: undefined,
    label: undefined,
  });
  const history = useHistory();
  const handleAnswerLink = () => {
    history.push("/add/answer/edit", {
      ytLink,
      currentPolitician,
      currentQuestion: location.state?.currentQuestion,
    });
  };
  const handleInputChange = (evt: any) => {
    setYtLink(evt.target.value);
  };

  useEffect(() => {
    if (!location.state?.currentQuestion) history.push("/");
  }, []);

  return (
    <div className="add-dialog">
      <Dialog>
        <div>
          <h1>Add Video Answer</h1>
        </div>
        <div>
          <p>To the question</p>
        </div>
        <div className="asyncParent">
          <AsyncSelect
            onChange={(value: any) => {
              setCurrentPolitician(value.value);
              console.log(value.value);
            }}
            loadOptions={async (query: string) =>
              await searchPoliticians(query)
            }
          />
        </div>

        <input
          className="add-input"
          placeholder="Link to YouTube video"
          value={ytLink}
          onChange={handleInputChange}
        />
        <div>
          <PrimaryButton
            label="Next"
            icon={faArrowRight}
            onClick={handleAnswerLink}
          />
        </div>
      </Dialog>
    </div>
  );
};

const EditAnswerLinkDialog = ({ location }: any) => {
  const history = useHistory();
  const { ytLink, currentPolitician, currentQuestion } = location.state;
  const videoId = retrieveVideoId(ytLink);
  const [player, setPlayer] = useState<any>();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const handleStartChange = (evt: any) => {
    let playerTime = evt.target.value;
    player?.seekTo(playerTime);
    setStart(playerTime);
  };
  const handleEndChange = (evt: any) => {
    let playerTime = evt.target.value;
    player?.seekTo(playerTime);
    setEnd(playerTime);
  };
  const handleAnswerSubmit = async () => {
    await addAnswer({
      qid: currentQuestion,
      pid: currentPolitician,
      ytlink: ytLink,
      start: start,
      end: end,
    });
    history.push("/");
  };

  return (
    <div className="edit-dialog">
      <Dialog>
        <YouTube
          videoId={videoId}
          onReady={(evt: any) => {
            setPlayer(evt.target);
          }}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
              controls: 1,
              start: start,
              end: end,
              modestbranding: 1,
            },
          }}
        />
        <div>
          <div className="input-container">
            <span>Answer begins at </span>{" "}
            <input
              className="add-input"
              placeholder="0:00"
              type="number"
              value={start}
              onChange={handleStartChange}
            />
          </div>
          <div className="input-container">
            <span>Answer ends at </span>{" "}
            <input
              className="add-input"
              placeholder="0:00"
              type="number"
              value={end}
              onChange={handleEndChange}
            />
          </div>
        </div>

        <div>
          <PrimaryButton
            label="Post answer"
            icon={faArrowRight}
            onClick={handleAnswerSubmit}
          />
        </div>
      </Dialog>
    </div>
  );
};

export const AddScreen = (props: any) => {
  let { path } = useRouteMatch();

  return (
    <Screen>
      <ScreenHeader />
      <Screen center>
        <Switch>
          <Route path={`${path}/question`} component={AskQuestionDailog} />
          <Route
            path={`${path}/answer/edit`}
            component={EditAnswerLinkDialog}
          />
          <Route path={`${path}/answer`} component={AddAnswerLinkDialog} />
          <Route path={`${path}/`}>
            <QASelector
              payload={{
                currentQuestion: props.location.state?.currentQuestion,
              }}
            />
          </Route>
        </Switch>
      </Screen>
    </Screen>
  );
};
