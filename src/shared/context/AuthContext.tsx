import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";

import { getCurrentUser } from "../api/auth";

type AuthContextType = {
  currentUser: User;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {
  const [currentUser, setCurrentUser] =
    useState(getCurrentUser());

  const login = (user: User) => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem(
      "currentUser"
    );

    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}