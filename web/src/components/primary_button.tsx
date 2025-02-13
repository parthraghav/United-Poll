import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const PrimaryButton = ({ label, icon, ...rest }: any) => {
  return (
    <div {...rest} className="primary-button">
      <span>{label}</span>
      {icon && <FontAwesomeIcon icon={icon} />}
    </div>
  );
};
