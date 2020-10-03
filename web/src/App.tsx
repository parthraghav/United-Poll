import React, { useState } from "react";
import "./theme/app.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { LocaleSelector } from "./components";
import { HomeScreen, ProfileScreen, DebateScreen } from "./screens";
import {
  EmptyLocaleContext,
  LocaleContext,
  LocaleContextObject,
} from "./context/locale";
import { LocaleFirstRoute } from "./routes/localeFirstRoute";

function App() {
  const [localeContext, setLocaleContext] = useState<LocaleContextObject>({
    country: localStorage.getItem("country"),
    campaign: localStorage.getItem("campaign"),
  });
  console.log(localeContext);

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

  return (
    <div className="app">
      <LocaleContext.Provider value={persistingLocaleContext}>
        <Router>
          <Switch>
            <Route path="/choose" component={LocaleSelector} />
            <Route path="/debate/:u1?/:u2?/:q" component={DebateScreen} />
            <Route path="/u/:username" component={ProfileScreen} />
            <LocaleFirstRoute path="/">
              <HomeScreen />
            </LocaleFirstRoute>
          </Switch>
        </Router>
      </LocaleContext.Provider>
    </div>
  );
}

export default App;
