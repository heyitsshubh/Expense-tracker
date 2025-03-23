import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ name, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
