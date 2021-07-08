import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const PrimaryInput = ({ placeholder, ...rest }: any) => {
  return (
    <input
      {...rest}
      className="primary-input"
      placeholder={placeholder}
    ></input>
  );
};
