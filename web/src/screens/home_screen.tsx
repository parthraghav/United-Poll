import React, { useEffect, useState } from "react";
import { CandidateCarousel, QAGrid, Screen, ScreenHeader } from "../components";
import { getActivePoliticians, Politician } from "../core/politician";
import { getTopQuestions } from "../core/question";
import { dummyCandidateData, dummyQAData } from "../dummy_data";
import "./home_screen.css";

export const HomeScreen = (props: any) => {
  const [activePoliticians, setActivePoliticians] = useState<Array<Politician>>(
    []
  );
  const [topQuestions, setTopQuestions] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const _politicians = await getActivePoliticians();
      setActivePoliticians(_politicians);
    })();

    (async () => {
      const _questions = await getTopQuestions();
      setTopQuestions(_questions);
      console.log(_questions);
    })();
  }, []);
  return (
    <Screen>
      <ScreenHeader />
      <div className="padded-block home-screen-info-bar">
        <h1>Candidates in running</h1>
        <p>
          List is inclusive of Republican Party, Democratic Party and
          Independent Candidates
        </p>
      </div>
      <CandidateCarousel data={activePoliticians} />
      <div className="padded-block home-screen-info-bar">
        <h1>Top Questions</h1>
        <p>Answered by your candidates. Compare them, annotate them!</p>
      </div>
      <QAGrid data={topQuestions} />
    </Screen>
  );
};
