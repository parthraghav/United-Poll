import React, { useState } from "react";
import "./theme/app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LocaleSelector } from "./components";
import {
  HomeScreen,
  ProfileScreen,
  DebateScreen,
  AddScreen,
  LoadingScreen,
  WelcomeScreen,
} from "./screens";
import { LocaleContext, LocaleContextObject } from "./context/locale";
import { FirebaseApp } from "./firebase";
import { registerUserInfo } from "./core/user";
import { PrivateRoute } from "./routes/privateRoute";

enum UserStatus {
  Unknown,
  LoggedIn,
  LoggedOut,
}

function App() {
  const [localeContext, setLocaleContext] = useState<LocaleContextObject>({
    country: localStorage.getItem("country"),
    campaign: localStorage.getItem("campaign"),
  });

  const setPersistingLocaleContext = (ctx: LocaleContextObject) => {
    if (ctx.country) localStorage.setItem("country", ctx.country);
    if (ctx.campaign) localStorage.setItem("campaign", ctx.campaign);
    setLocaleContext(ctx);
  };

  const [persistingLocaleContext] = useState({
    locale: localeContext,
    setLocale: (update: any) =>
      setPersistingLocaleContext({ localeContext, ...update }),
  });

  const [userStatus, setUserStatus] = useState(UserStatus.Unknown);
  const [user, setUser] = useState<any>();
  FirebaseApp.auth.onAuthStateChanged(async function (newUser) {
    if (newUser) {
      setUserStatus(UserStatus.LoggedIn);
      registerUserInfo();
    } else {
      setUserStatus(UserStatus.LoggedOut);
    }
    setUser(newUser);
  });

  return (
    <div className="app">
      {userStatus === UserStatus.Unknown && <LoadingScreen />}
      {userStatus === UserStatus.LoggedOut && <WelcomeScreen />}
      {userStatus === UserStatus.LoggedIn && (
        <LocaleContext.Provider value={persistingLocaleContext}>
          <Router>
            <Switch>
              <PrivateRoute path="/choose">
                <LocaleSelector />
              </PrivateRoute>
              <PrivateRoute
                path="/debate/:u1?/:u2?/:q"
                component={DebateScreen}
              />
              <PrivateRoute path="/u/:username" component={ProfileScreen} />
              <PrivateRoute path="/add" component={AddScreen} />
              <Route path="/" component={HomeScreen} />
            </Switch>
          </Router>
        </LocaleContext.Provider>
      )}
    </div>
  );
}

export default App;
