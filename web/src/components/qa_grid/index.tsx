import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export const QuestionBox = ({ question, politicians = [] }: any) => {
  const history = useHistory();
  let u1 = "any",
    u2 = "any";
  if (politicians[0]) u1 = politicians[0];
  if (politicians[1]) u2 = politicians[1];
  const handleClick = () => {
    history.push(`/debate/${u1}/${u2}/${question.id}`);
  };
  return (
    <div className="question-box" onClick={handleClick}>
      <div className="question-bubble-container">
        <div className="question-bubble">
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      </div>
      <div className="question-content-container">
        <span className="question-content">{question.text}</span>
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
      <img className="thumbnail" src={answer.thumbnail} alt={answer.id} />
      <div className="answer-info-container">
        <span className="answer-question">{answer.question_text}</span>
        <span className="answer-metrics">
          <b>{answer.views}</b> Views <b>{answer.shares}</b> Shares
        </span>
      </div>
    </div>
  );
};

export const QAGrid = ({ data, isProfileView, politicians }: any) => {
  const isQuestion = !isProfileView;
  return (
    <div className="qa-grid-container">
      <div className={"qa-grid " + (isProfileView ? "profile-view" : "")}>
        {data.map((content: any, index: number) => {
          return isQuestion ? (
            <QuestionBox
              question={content}
              key={index}
              politicians={politicians}
            />
          ) : (
            <AnswerBox answer={content} key={index} />
          );
        })}
      </div>
    </div>
  );
};
