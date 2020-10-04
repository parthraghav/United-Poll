import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export const QuestionBox = ({ question }: any) => {
  return (
    <div className="question-box">
      <div className="question-bubble-container">
        <div className="question-bubble">
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      </div>
      <div className="question-content-container">
        <span className="question-content">{question.name}</span>
      </div>
      {/* <div>
        <span>{question.views} Views</span>
        <span>{question.shares} Shares</span>
      </div> */}
      <div className="question-answer-count-container">
        <span className="question-answer-count">
          {question.answer_count} Answers
        </span>
      </div>
    </div>
  );
};

const AnswerBox = ({ answer }: any) => {
  return (
    <div className="answer-box">
      <img className="thumbnail" src={answer.thumbnail} />
      <div className="answer-info-container">
        <span className="answer-question">{answer.question_text}</span>
        <span className="answer-metrics">
          <b>{answer.views}</b> Views <b>{answer.shares}</b> Shares
        </span>
      </div>
    </div>
  );
};

export const QAGrid = ({ data, isProfileView }: any) => {
  return (
    <div className="qa-grid-container">
      <div className={"qa-grid " + (isProfileView ? "profile-view" : "")}>
        {data.map((content: any, index: number) => {
          return content.type == "question" ? (
            <QuestionBox question={content} key={index} />
          ) : (
            <AnswerBox answer={content} key={index} />
          );
        })}
      </div>
    </div>
  );
};
