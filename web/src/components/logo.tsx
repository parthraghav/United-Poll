import React from "react";

export const Logo = (props: any) => {
  const size = props.size || 3;
  return (
    <img
      {...props}
      src={
        "https://firebasestorage.googleapis.com/v0/b/unitedpoll-71c75.appspot.com/o/static%2FUnited-Poll-Logo%40" +
        size +
        "x.png?alt=media"
      }
    />
  );
};
