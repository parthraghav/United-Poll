import React, { useState } from "react";
import { Logo } from "../logo";
import countryList from "country-list";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const ContinueButton = (props: any) => {
  return (
    <div {...props} className="primary-button">
      <span>Continue</span>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};

const CountrySelector = (props: any) => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const handleSelectChange = (evt: any) => {
    setSelectedCountry(evt.target.value);
  };

  return (
    <div className="selector-dialog">
      <div className="selector-dialog-row">
        <div className="selector-num">
          <span>1</span>
        </div>
      </div>
      <div className="selector-dialog-row">
        <h1>Select Country</h1>
      </div>
      <div className="selector-dialog-row">
        <p>Where you’re looking to participate in the electoral vote </p>
      </div>
      <div className="selector-dialog-row">
        <div className="locale-selector-select-container">
          <select
            className="locale-selector-select selector-dialog-row"
            name="country-selector-select-dropdown"
            id="country-selector-select-dropdown"
            onChange={handleSelectChange}
          >
            {countryList.getData().map((country) => (
              <option value={country.code} selected={country.code === "US"}>
                {country.name}
              </option>
            ))}
          </select>
          <div className="locale-selector-country-flag-container">
            <ReactCountryFlag
              countryCode={selectedCountry}
              className="locale-selector-country-flag"
              style={{ fontSize: "2em" }}
            />
          </div>
        </div>
      </div>
      <div className="selector-dialog-spacer"></div>
      <div className="selector-dialog-row">
        <ContinueButton />
      </div>
    </div>
  );
};

const CampaignSelector = (props: any) => {
  const campaignData = [
    {
      country: "US",
      name: "Oklahoma Primaries",
      code: "US-OKP2020",
    },
  ];
  const [selectedElection, setSelectedElection] = useState(null);
  const handleSelectChange = (evt: any) => {
    setSelectedElection(evt.target.value);
  };

  return (
    <div className="selector-dialog">
      <div className="selector-dialog-row">
        <div className="selector-num">
          <span>2</span>
        </div>
      </div>
      <div className="selector-dialog-row">
        <h1>Choose Election</h1>
      </div>
      <div className="selector-dialog-row">
        <p>For which you wish to see all the candidates who are in the race</p>
      </div>
      <div className="selector-dialog-row">
        <div className="locale-selector-select-container">
          <select
            className="locale-selector-select selector-dialog-row"
            name="campaign-selector-select-dropdown"
            id="campaign-selector-select-dropdown"
            onChange={handleSelectChange}
          >
            {campaignData.map((campaign) => (
              <option value={campaign.code}>{campaign.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="selector-dialog-spacer"></div>
      <div className="selector-dialog-row">
        <ContinueButton />
      </div>
    </div>
  );
};

export const LocaleSelector = () => {
  let { path } = useRouteMatch();

  return (
    <div className="locale-selector-container">
      <div className="locale-selector-logo-container">
        <Logo width="300" />
      </div>
      <Switch>
        <Route path={`${path}/country`} component={CountrySelector} />
        <Route path={`${path}/campaign`} component={CampaignSelector} />
      </Switch>
    </div>
  );
};
