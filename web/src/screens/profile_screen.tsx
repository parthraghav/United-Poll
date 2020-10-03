import React from "react";
import { useParams } from "react-router-dom";
import { Screen, ScreenHeader } from "../components";
import "./profile_screen.css";

export const ProfileScreen = (props: any) => {
  let { username }: any = useParams();
  return (
    <Screen>
      <ScreenHeader />
      <h3>{username}</h3>
    </Screen>
  );
};
