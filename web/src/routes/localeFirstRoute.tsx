import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LocaleContext } from "../context/locale";

export const LocaleFirstRoute = ({ children, ...rest }: any) => {
  const { locale } = useContext(LocaleContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log(!locale.country || !locale.campaign);
        if (!locale.country || !locale.campaign)
          return (
            <Redirect
              to={{
                pathname: "/choose",
                state: { from: location },
              }}
            />
          );
        return children;
      }}
    />
  );
};
