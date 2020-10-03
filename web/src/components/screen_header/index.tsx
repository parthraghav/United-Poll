import React, { useContext } from "react";
import { LocaleContext } from "../../context/locale";
import "./styles.css";
// @ts-ignore
import ReactCountryFlag from "react-country-flag";

export const ScreenHeader = () => {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="screen-header">
      <div>
        <ReactCountryFlag
          countryCode={locale.country}
          className="locale-selector-country-flag"
          style={{ fontSize: "2em" }}
        />
        <span>{locale.campaign}</span>
      </div>
    </div>
  );
};
