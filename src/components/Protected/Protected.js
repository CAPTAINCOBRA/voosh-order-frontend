import React from "react";
import { Navigate } from "react-router-dom";
function Protected({ isSignedIn, children }) {
  if (!(isSignedIn !== null && isSignedIn.length > 0)) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
export default Protected;
