import React, { useContext } from "react";
import { LocaleContext } from "../../context/locale";
import "./styles.css";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../primary_button";
import { SecondaryButton } from "../secondary_button";
import { logout } from "../../core/auth";

export const ScreenHeader = () => {
  const { locale } = useContext(LocaleContext);
  const history = useHistory();
  const location = useLocation();
  const handleLocaleClick = () => {
    history.push("/choose");
  };
  const handleBackBtnClick = () => {
    history.goBack();
  };
  const isNotInitialized = !locale.campaign || !locale.country;
  return (
    <div className="screen-header">
      <div className="screen-header-left-block">
        {location.pathname != "/" && (
          <SecondaryButton
            icon={faChevronLeft}
            onClick={handleBackBtnClick}
            label="Back"
          />
        )}

        <SecondaryButton
          icon={faPlus}
          onClick={() => history.push("/add/question")}
          label="Ask Question"
        />
      </div>
      <div>
        <SecondaryButton onClick={() => logout()} label="Logout" />
      </div>
      {/* {!isNotInitialized && (
        <div onClick={handleLocaleClick}>
          <ReactCountryFlag
            countryCode={locale.country}
            className="locale-selector-country-flag"
            style={{ fontSize: "2em" }}
          />
          <span className="locale-campaign-name">{locale.campaign}</span>
        </div>
      )} */}
    </div>
  );
};
