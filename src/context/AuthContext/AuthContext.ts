import { createContext } from "react";
import { UserType } from "../../types/user";
import { LoginType, TokenResponseType } from "../../types/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  keepMeSignedIn: boolean;
  signIn: ({ email, password }: LoginType) => Promise<void>;
  signOut: () => void;
  user?: UserType;
  setUser?: React.Dispatch<React.SetStateAction<UserType | undefined>>;

  accessToken?: TokenResponseType;
  setAccessToken?: React.Dispatch<
    React.SetStateAction<TokenResponseType | undefined>
  >;
};

export const AuthContext = createContext<AuthContextType>({
  keepMeSignedIn: false,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: () => {},

  accessToken: undefined,
  setAccessToken: () => {},
});

export default AuthContext;
