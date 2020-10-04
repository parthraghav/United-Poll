import React from "react";
import "./styles.css";

export const Screen = ({ children, center }: any) => {
  return (
    <div
      className={"screen-component " + (center ? "screen-center-content" : "")}
    >
      {children}
    </div>
  );
};
