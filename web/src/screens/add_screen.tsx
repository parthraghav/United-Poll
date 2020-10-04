import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import YouTube from "react-youtube";
import { Dialog, Screen, ScreenHeader } from "../components";
import { PrimaryButton } from "../components/primary_button";
import { retrieveVideoId } from "../core/utils";
import "./add_screen.css";

const QASelector = () => {
  const history = useHistory();
  const handleAskBtnClick = () => {
    history.push("/add/question");
  };
  const handleAnswerBtnClick = () => {
    history.push("/add/answer");
  };
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
        <div>
          <PrimaryButton
            label="Answer a question"
            icon={faArrowRight}
            onClick={handleAnswerBtnClick}
          />
        </div>
      </Dialog>
    </div>
  );
};

const AskQuestionDailog = () => {
  const history = useHistory();
  const handleAnswerBtnClick = () => {
    history.push("/add/answer");
  };
  return (
    <div className="add-dialog">
      <Dialog>
        <div>
          <h1>Ask New Policy Question</h1>
        </div>
        <div>
          <p>Any other candidate can also answer this question</p>
        </div>
        <textarea className="add-text-area" rows={5} />
        <div>
          <PrimaryButton
            label="Post question"
            icon={faArrowRight}
            onClick={handleAnswerBtnClick}
          />
        </div>
      </Dialog>
    </div>
  );
};

const AddAnswerLinkDialog = () => {
  const [ytLink, setYtLink] = useState("");
  const history = useHistory();
  const handleAnswerLink = () => {
    history.push("/add/answer/edit", { ytLink });
  };
  const handleInputChange = (evt: any) => {
    setYtLink(evt.target.value);
  };
  return (
    <div className="add-dialog">
      <Dialog>
        <div>
          <h1>Add Video Answer</h1>
        </div>
        <div>
          <p>To the question</p>
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
  const { ytLink } = location.state;
  const videoId = retrieveVideoId(ytLink);
  const [player, setPlayer] = useState<any>();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const handleStartChange = (evt: any) => {
    let playerTime = evt.target.value;
    player.seekTo(playerTime);
    setStart(playerTime);
  };
  const handleEndChange = (evt: any) => {
    let playerTime = evt.target.value;
    player.seekTo(playerTime);
    setEnd(playerTime);
  };
  const handleAnswerSubmit = () => {
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
          <Route path={`${path}/`} component={QASelector} />
        </Switch>
      </Screen>
    </Screen>
  );
};
