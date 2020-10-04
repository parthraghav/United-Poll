import React from "react";

export const Dialog = ({ children, className, ...rest }: any) => {
  return (
    <div {...rest} className="dialog">
      {children}
    </div>
  );
};
