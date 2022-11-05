import React, { createContext } from "react";
import {
  AuthContextDataProps,
  AuthProviderProps,
  UserProps,
} from "./AuthContext.types";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { api } from "../services/api";
WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isUserLoading, setIsUserLoading] = React.useState(false);
  const [user, setUser] = React.useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  const signIn = async () => {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const singInWithGoogle = async (access_token: string) => {
    try {
      setIsUserLoading(true);
      const response = await api.post("/users", { access_token });
      if (response.data?.token) {
        api.defaults.headers.common["Authorization"] =
          "Bearer " + response.data?.token;

        const userInfoResponse = await api.get("/me");
        setUser(userInfoResponse.data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUserLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      singInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
