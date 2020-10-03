import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import { QAGrid, Screen, ScreenHeader } from "../components";
import { dummyAnswers, dummyProfileData } from "../dummy_data";
import "./profile_screen.css";

const ProfilePhoto = ({ src, children }: any) => {
  return (
    <div className="profile-photo">
      <img src={src} />
      {children}
    </div>
  );
};

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
      <h1>{data.name}</h1>
      <p>{data.party}</p>
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
          <b>{data.verified_claim_percent}%</b>
          <span>Verified Claims</span>
        </span>
      </div>
    </div>
  );
};

interface ParamTypes {
  username: string;
}

export const ProfileScreen = (props: any) => {
  const { username } = useParams<ParamTypes>();
  const userData = dummyProfileData[username];

  return (
    <Screen>
      <ScreenHeader />
      <div className="profile-area">
        <ProfilePhotoButtonStack src={userData.imageLink} />
        <ProfileInfo data={userData} />
        <QAGrid isProfileView data={dummyAnswers} />
      </div>
    </Screen>
  );
};
