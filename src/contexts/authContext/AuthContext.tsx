import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
  matrixHistory: Array<string>;
  addToHistory: (calculation: string) => void;
  clearHistory: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  matrixHistory: [],
  addToHistory: () => {},
  clearHistory: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [matrixHistory, setMatrixHistory] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("matrixHistory") || "[]")
  );

  const login = (user: string) => {
    setUser(user);
    localStorage.setItem("user", user);
    // Clear history when a new user logs in
    setMatrixHistory([]);
    localStorage.removeItem("matrixHistory");
  };

  const logout = () => {
    setUser(null);
    setMatrixHistory([]);
    localStorage.removeItem("user");
    localStorage.removeItem("matrixHistory");
  };

  const addToHistory = (calculation: string) => {
    const updatedHistory = [...matrixHistory, calculation];
    setMatrixHistory(updatedHistory);
    localStorage.setItem("matrixHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setMatrixHistory([]);
    localStorage.removeItem("matrixHistory");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedHistory = JSON.parse(
      localStorage.getItem("matrixHistory") || "[]"
    );
    if (savedUser) {
      setUser(savedUser);
      setMatrixHistory(savedHistory);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, matrixHistory, addToHistory, clearHistory }}
    >
      {children}
    </AuthContext.Provider>
  );
};
