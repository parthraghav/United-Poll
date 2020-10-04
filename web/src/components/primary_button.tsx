import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const PrimaryButton = ({ label, icon, ...rest }: any) => {
  return (
    <div {...rest} className="primary-button">
      <span>{label}</span>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};
