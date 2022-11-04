import React from "react";
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";
import { AuthContextDataProps } from "../contexts/AuthContext.types";
const useAuth = (): AuthContextDataProps => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
