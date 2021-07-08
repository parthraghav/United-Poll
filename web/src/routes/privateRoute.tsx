import React from "react";
import { Redirect, Route } from "react-router-dom";
import { FirebaseApp } from "../firebase";

export const PrivateRoute = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!FirebaseApp.auth.currentUser)
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        return children;
      }}
    />
  );
};
