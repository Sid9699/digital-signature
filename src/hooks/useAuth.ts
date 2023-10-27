import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";

function useAuth() {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return contextValue;
}

export default useAuth;
