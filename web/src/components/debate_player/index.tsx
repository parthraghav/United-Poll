import React from "react";
import { useHistory } from "react-router-dom";
import { VideoPlayer } from "..";
import { PrimaryButton } from "../primary_button";
import { QuestionBox } from "../qa_grid";
import "./styles.css";

export const DebatePlayer = ({ data }: any) => {
  const history = useHistory();
  const questionInfo = data.answer[0].question;
  const recommendations = data.suggested;

  const handleFirstResponseComplete = () => {};
  const handleSecondResponseComplete = () => {};

  const handleBtnClick = () => {
    history.push("/add");
  };

  return (
    <div className="debate-player-container">
      <div className="debate-player">
        <div className="debate-player-main">
          <VideoPlayer data={data.answer[0]} />
          <div className="debate-player-showcase">
            <span>QUESTION</span>
            <h2>{questionInfo.name}</h2>
            <div>
              <span>
                <b>{questionInfo.views}</b> Views
              </span>{" "}
              <span>
                <b>{questionInfo.shares}</b> Shares
              </span>
            </div>
            <div>
              <PrimaryButton label="Ask/Answer" onClick={handleBtnClick} />
            </div>
          </div>
          <VideoPlayer data={data.answer[1]} />
        </div>
        <div className="debate-player-recommendations-container">
          <h3>Next in debate</h3>
          <div className="debate-player-recommendations">
            {recommendations.map((recommendation: any, index: number) => {
              return (
                <div className="recommendation-box-container">
                  <QuestionBox question={recommendation} key={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
