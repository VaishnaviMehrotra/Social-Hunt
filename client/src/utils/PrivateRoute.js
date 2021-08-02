import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userState } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        userState.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
