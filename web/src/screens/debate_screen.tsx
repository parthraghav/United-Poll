import React from "react";
import { useParams } from "react-router-dom";
import { Screen, ScreenHeader } from "../components";
import "./debate_screen.css";

export const DebateScreen = (props: any) => {
  let { u1, u2, q }: any = useParams();
  console.log(u1, u2, q);
  return (
    <Screen>
      <ScreenHeader />
      <span>{u1}</span>
      <span>{u2}</span>
      <span>{q}</span>
    </Screen>
  );
};
