import React, { createContext, useEffect, useState, useContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(() => localStorage.getItem("adminId"));

  useEffect(() => {
    const storedAdminId = localStorage.getItem("adminId");
    setAdminId(storedAdminId);
  }, []);

  return (
    <AuthContext.Provider value={{ adminId, setAdminId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
