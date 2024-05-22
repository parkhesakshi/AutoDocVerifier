import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  // this is the AuthRoute component
  const { authenticated, useremail } = useSelector((state) => state.user); // this is the redux hook to get the user data from the redux store
  return !authenticated ? <Navigate to="/" replace /> : children; // this is the ternary operator to check if the user is authenticated or not and return the children component if the user is authenticated or return the Navigate component to redirect the user to the home page if the user is not authenticated
};

export default AuthRoute;
