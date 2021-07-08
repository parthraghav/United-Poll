import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { Dialog, Screen, ScreenHeader } from "../components";
import { BackgroundAnimation } from "../components/background_animation";
import { Logo } from "../components/logo";
import { PrimaryButton } from "../components/primary_button";
import { PrimaryDialog } from "../components/primary_dialog";
import { loginWithGoogle } from "../core/auth";
import "./welcome_screen.css";

export const WelcomeScreen = (props: any) => {
  let color = "#565656";
  return (
    <Screen>
      <div className="welcome-dialog">
        <Dialog style={{ width: 500 }}>
          <div>
            <h1>Cicadas</h1>
          </div>
          <div>
            <p>Not for politicians. Not for profit.<br></br>For the Public.</p>
          </div>
          <div>
            <PrimaryButton
              label="Login with Google"
              icon={faArrowRight}
              onClick={() => loginWithGoogle()}
            />
          </div>
        </Dialog>
      </div>
    </Screen>
  );
};
