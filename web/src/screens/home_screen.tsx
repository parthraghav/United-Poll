import React from "react";
import { CandidateCarousel, QAGrid, Screen, ScreenHeader } from "../components";
import { dummyCandidateData, dummyQAData } from "../dummy_data";
import "./home_screen.css";

export const HomeScreen = (props: any) => {
  return (
    <Screen>
      <ScreenHeader />
      <div className="padded-block home-screen-info-bar">
        <h1>148 Candidates in running</h1>
        <p>
          List is inclusive of Republican Party, Democratic Party and
          Independent Candidates
        </p>
      </div>
      <CandidateCarousel data={dummyCandidateData} />
      <div className="padded-block home-screen-info-bar">
        <h1>Top 300 Questions</h1>
        <p>Answered by your candidates. Compare them, annotate them!</p>
      </div>
      <QAGrid data={dummyQAData} />
    </Screen>
  );
};
