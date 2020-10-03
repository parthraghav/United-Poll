import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
const QuestionBox = ({ question }: any) => {
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

export const QAGrid = ({ data }: any) => {
  return (
    <div className="qa-grid-container">
      <div className="qa-grid">
        {data.map((content: any, index: number) => {
          return <QuestionBox question={content} key={index} />;
        })}
      </div>
    </div>
  );
};
