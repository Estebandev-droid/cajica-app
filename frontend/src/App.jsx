// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import LandingPage from './components/Landing/LandingPage';
import CaseManager from './components/CaseManager/CaseManager';
import CaseDetails from './components/CaseDetails/CaseDetails'; // Importar el componente de detalles de casos
import MeasureDetails from './components/MeasureDetails/MeasureDetails'; // Importar el componente de detalles de medidas

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cases" element={<CaseManager />} />
        <Route path="/cases/:id" element={<CaseDetails />} /> {/* Añadir la ruta de detalles de casos */}
        <Route path="/measures/:id" element={<MeasureDetails />} /> {/* Añadir la ruta de detalles de medidas */}
      </Routes>
    </Router>
  );
};

export default App;