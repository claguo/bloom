import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import WorldPage from './pages/WorldPage';
import NavBar from './components/NavBar';
import USAPage from './pages/USAPage';
import { CountryProvider } from './assets/CountryContext';
import { USAStateProvider } from './assets/StateContext';

function App() {
  return (
    <CountryProvider>
      <USAStateProvider>
        <Router>
          <div className='flex bg-light-gray'>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<WorldPage />} />
            <Route path="/usa" element={<USAPage />} />
          </Routes>
          </div>
        </Router>
      </USAStateProvider>
    </CountryProvider>
  )
}

export default App;