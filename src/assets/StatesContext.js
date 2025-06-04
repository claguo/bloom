import React, { createContext, useContext, useState } from "react";

const statesContext = createContext();

export const StatesProvider = ({ children }) => {
  const [statesData, setStatesData] = useState({ features: [] });

  return (
    <statesContext.Provider value={{ statesData, setStatesData }}>
      {children}
    </statesContext.Provider>
  );
};

export const useStatesData = () => {
  return useContext(statesContext);
};
