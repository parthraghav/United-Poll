import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { VideoPlayer } from "..";
import { getAnswersForQuestion } from "../../core/answer";
import { getPoliticianInfo } from "../../core/politician";
import { getQuestionInfo, getQuestionSuggestions } from "../../core/question";
import { LoadingScreen } from "../../screens";
import { PrimaryButton } from "../primary_button";
import { QuestionBox } from "../qa_grid";
import "./styles.css";

export const DebatePlayer = (props: any) => {
  const history = useHistory();
  let { q, u1, u2 } = props;

  const [question, setQuestion] = useState<any>();
  const [firstAnswer, setFirstAnswer] = useState<any>();
  const [secondAnswer, setSecondAnswer] = useState<any>();
  const [firstPolitician, setFirstPolitician] = useState<any>();
  const [secondPolitician, setSecondPolitician] = useState<any>();
  const [suggestions, setSuggestions] = useState<any>();

  useEffect(() => {
    (async () => {
      const question = await getQuestionInfo(q);
      if (u1 === "any") u1 = undefined;
      if (u2 === "any") u2 = undefined;
      if (u1 && !u2) {
        const politicians = Object.keys(question?.answered_by_politicians);
        u2 = politicians.find((pid: any) => pid !== u1);
      } else if (u2 && !u1) {
        const politicians = Object.keys(question?.answered_by_politicians);
        u1 = politicians.find((pid: any) => pid !== u2);
      } else if (!u1 && !u2) {
        const politicians = Object.keys(question?.answered_by_politicians);
        u1 = politicians[0];
        u2 = politicians[1];
      }

      let politicians = [];
      if (u1) politicians.push(u1);
      if (u2) politicians.push(u2);
      const answers = await getAnswersForQuestion({
        qid: q,
        politicians: politicians,
      });
      setFirstAnswer(answers[0]);
      setSecondAnswer(answers[1]);

      const suggestions = await getQuestionSuggestions({ q, u1, u2 });

      if (u1) setFirstPolitician(await getPoliticianInfo(u1));
      if (u2) setSecondPolitician(await getPoliticianInfo(u2));
      setQuestion(question);

      setSuggestions(suggestions);
    })();
  }, []);

  const handleBtnClick = () => {
    history.push("/add", { currentQuestion: props.q });
  };

  const shouldShowVideoPlayer =
    (firstAnswer && firstPolitician) || (secondAnswer && secondPolitician);

  return question ? (
    <div className="debate-player-container">
      <div className="debate-player">
        <div className="debate-player-main">
          {shouldShowVideoPlayer && (
            <VideoPlayer answer={firstAnswer} politician={firstPolitician} />
          )}
          <div className="debate-player-showcase">
            <span>QUESTION</span>
            <h2>{question && question.text}</h2>
            <div>
              <span>
                <b>{question && question.click_count}</b> Views
              </span>
            </div>
            <div>
              <PrimaryButton label="Add Answer" onClick={handleBtnClick} />
            </div>
          </div>
          {shouldShowVideoPlayer && (
            <VideoPlayer answer={secondAnswer} politician={secondPolitician} />
          )}
        </div>
        {suggestions && (
          <div className="debate-player-recommendations-container">
            <h3>Next in debate</h3>
            <div className="debate-player-recommendations">
              {suggestions.map((suggestion: any, index: number) => {
                return (
                  <div className="recommendation-box-container" key={index}>
                    <QuestionBox question={suggestion} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <LoadingScreen />
  );
};
