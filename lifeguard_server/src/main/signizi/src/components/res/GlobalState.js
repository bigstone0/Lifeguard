import React, { createContext, useState } from "react";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("SANGHO");
  const [lastName, setLastName] = useState("LEE");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
