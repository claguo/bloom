import React, { createContext, useContext, useState } from 'react';

const USAStateContext = createContext();

export const USAStateProvider = ({ children }) => {
  const [USAStates, setUSAStates] = useState({ features: [] });

  return (
    <USAStateContext.Provider value={{ USAStates, setUSAStates }}>
      {children}
    </USAStateContext.Provider>
  );
};

export const useUSAState = () => {
  return useContext(USAStateContext);
};