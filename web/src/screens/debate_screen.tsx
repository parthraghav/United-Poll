import React from "react";
import { useParams } from "react-router-dom";
import { DebatePlayer, Screen, ScreenHeader } from "../components";
import { dummyDebateData } from "../dummy_data";
import "./debate_screen.css";

export const DebateScreen = (props: any) => {
  let { u1, u2, q }: any = useParams();
  return (
    <Screen>
      <ScreenHeader />
      <DebatePlayer q={q} u1={u1} u2={u2} />
    </Screen>
  );
};
