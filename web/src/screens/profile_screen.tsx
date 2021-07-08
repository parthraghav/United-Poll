import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ProfilePhoto, QAGrid, Screen, ScreenHeader } from "../components";
import { getPoliticianInfo, Politician } from "../core/politician";
import { getQuestionsAnsweredByPolitician } from "../core/question";
import { dummyAnswers, dummyProfileData } from "../dummy_data";
import { LoadingScreen } from "./loading_screen";
import "./profile_screen.css";

const ProfilePhotoButtonStack = ({ src }: any) => {
  return (
    <div className="profile-photo-btn-stack">
      <ProfilePhoto src={src}>
        <div className="question-btn">
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      </ProfilePhoto>
    </div>
  );
};

const ProfileInfo = ({ data }: any) => {
  return (
    <div className="profile-info-container">
      <h1>{data.full_name}</h1>
      <p>{data.party_affiliation}</p>
      <hr />
      <div className="profile-info-metrics">
        <span>
          <b>{data.question_count}</b>
          <span>Questions</span>
        </span>
        <span>
          <b>{data.answer_count}</b>
          <span>Answers</span>
        </span>
        <span>
          <b>{data.click_count}</b>
          <span>Views</span>
        </span>
      </div>
    </div>
  );
};

interface ParamTypes {
  username: string;
}
enum CallStatus {
  Unoccured,
  Sent,
  Received,
}

export const ProfileScreen = (props: any) => {
  const history = useHistory();
  const { username } = useParams<ParamTypes>();
  const [politician, setPolitician] = useState<any>();
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [callStatus, setCallStatus] = useState<CallStatus>(
    CallStatus.Unoccured
  );
  useEffect(() => {
    (async () => {
      const _politician = await getPoliticianInfo(username);
      if (_politician) setPolitician(_politician);
      else history.goBack();
    })();
    (async () => {
      const _questions = await getQuestionsAnsweredByPolitician(username);
      console.log(_questions, username);
      if (_questions) setQuestions(_questions);
    })();
  }, []);

  return politician ? (
    <Screen>
      <ScreenHeader />
      <div className="profile-area">
        <ProfilePhotoButtonStack src={politician.display_picture_link} />
        <ProfileInfo data={politician} />
        <QAGrid data={questions} politicians={[politician.id]} />
      </div>
    </Screen>
  ) : (
    <LoadingScreen />
  );
};
