import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

import { Screen, ScreenHeader } from "../components";
import "./loading_screen.css";

export const LoadingScreen = (props: any) => {
  let color = "#565656";
  return (
    <Screen>
      {/* <ScreenHeader /> */}
      <div className="loader-container">
        <SyncLoader
          color={color}
          loading={true}
          size={20}
          speedMultiplier={0.5}
        />
      </div>
    </Screen>
  );
};
