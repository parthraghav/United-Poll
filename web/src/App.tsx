import React from "react";
import "./theme/app.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { LocaleSelector } from "./components/locale_selector/locale_selector";
import { HomeScreen } from "./screens/HomeScreen";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/choose" component={LocaleSelector} />
          <Route path="/" component={HomeScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
