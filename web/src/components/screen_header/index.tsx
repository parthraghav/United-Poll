import React, { useContext } from "react";
import { LocaleContext } from "../../context/locale";
import "./styles.css";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const ScreenHeader = () => {
  const { locale } = useContext(LocaleContext);
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const handleLocaleClick = () => {
    history.push("/choose");
  };
  const handleBackBtnClick = () => {
    history.goBack();
  };
  return (
    <div className="screen-header">
      <div>
        {location.pathname != "/" && (
          <div onClick={handleBackBtnClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="back-btn-label">Back</span>
          </div>
        )}
      </div>
      <div onClick={handleLocaleClick}>
        <ReactCountryFlag
          countryCode={locale.country}
          className="locale-selector-country-flag"
          style={{ fontSize: "2em" }}
        />
        <span className="locale-campaign-name">{locale.campaign}</span>
      </div>
    </div>
  );
};
