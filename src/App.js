import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Page from "./pages/Page";
import { CountryProvider } from "./assets/CountryContext";
import { StatesProvider } from "./assets/StatesContext";

function App() {
  return (
    <CountryProvider>
      <StatesProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<Page />} />
          </Routes>
        </Router>
      </StatesProvider>
    </CountryProvider>
  );
}

export default App;
