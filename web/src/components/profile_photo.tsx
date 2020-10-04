import React from "react";
import "./styles.common.css";

export const ProfilePhoto = ({ src, children, ...rest }: any) => {
  const isSizeProvided = !!rest.width && !!rest.height;
  return (
    <div
      className="profile-photo"
      {...rest}
      style={isSizeProvided ? { width: rest.width, height: rest.height } : {}}
    >
      <img src={src} />
      {children}
    </div>
  );
};
