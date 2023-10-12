import React, { createContext, useContext, useState } from 'react';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState({ features: [] });

  return (
    <CountryContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  return useContext(CountryContext);
};