// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import LandingPage from './components/Landing/LandingPage';
import CaseManager from './components/CaseManager/CaseManager';
import CaseDetails from './components/CaseDetails/CaseDetails'; // Importar el componente de detalles de casos
import MeasureDetails from './components/MeasureDetails/MeasureDetails'; // Importar el componente de detalles de medidas
import PardList from './components/PardList/PardList'; // Importar el componente de lista de casos PARD
import MeasureList from './components/MeasureList/MeasureList'; // Importar el componente de lista de medidas de protección
import EditMeasureForm from './components/FormsEdit/EditMeasureForm';
import EditPardForm from './components/FormsEdit/EditPardForm';
import UploadDocumentsPage from './components/uploaddocumentspdf/UploadDocumentsPage';
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cases" element={<CaseManager />} />
            <Route path="/cases/:id" element={<CaseDetails />} /> {/* Añadir la ruta de detalles de casos */}
            <Route path="/measures/:id" element={<MeasureDetails />} /> {/* Añadir la ruta de detalles de medidas */}
            <Route path="/pard-list" element={<PardList />} /> {/* Añadir la ruta de lista de casos PARD */}
            <Route path="/measure-list" element={<MeasureList />} /> {/* Añadir la ruta de lista de medidas de protección */}
            <Route path="/measures/edit/:id" element={<EditMeasureForm />} /> {/* Ruta para editar medidas */}
            <Route path="/cases/edit/:id" element={<EditPardForm />} /> {/* Ruta para editar casos PARD */}
            <Route path="/upload-documents" element={<UploadDocumentsPage />} /> {/* Nueva ruta */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;