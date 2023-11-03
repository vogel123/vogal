import React from "react";
import { Navigate } from "react-router-dom";

const TokenComponent = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default TokenComponent;
