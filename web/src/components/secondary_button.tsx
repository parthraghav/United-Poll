import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SecondaryButton = ({ label, icon, ...rest }: any) => {
  return (
    <div {...rest} className="secondary-button">
      {icon && <FontAwesomeIcon icon={icon} />}
      <span className="back-btn-label">{label}</span>
    </div>
  );
};
