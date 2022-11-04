import { ReactNode } from "react";

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}

export interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}
