import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${BASE_URL}/cases/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCaseDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCaseDetails();
  }, [id, navigate]);

  if (!caseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Detalles del Caso PARD</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Número de Caso:</span>
            <span>{caseDetails.caseNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Fecha de Conocimiento:</span>
            <span>{new Date(caseDetails.knowledgeDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Fecha de Apertura:</span>
            <span>{new Date(caseDetails.openingDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Estado:</span>
            <span>{caseDetails.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Derecho Vulnerado:</span>
            <span>{caseDetails.violatedRight}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Motivo de Consulta:</span>
            <span>{caseDetails.consultationReason}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Lesión:</span>
            <span>{caseDetails.injury}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Parentesco con Agresor:</span>
            <span>{caseDetails.familyRelationship}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Nombre del NNA:</span>
            <span>{caseDetails.nnaName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Fecha de Nacimiento:</span>
            <span>{new Date(caseDetails.birthDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Edad:</span>
            <span>{caseDetails.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tipo de Documento:</span>
            <span>{caseDetails.documentType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Número de Historia:</span>
            <span>{caseDetails.historyNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">EPS:</span>
            <span>{caseDetails.eps}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Sector de Residencia:</span>
            <span>{caseDetails.residenceSector}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Dirección:</span>
            <span>{caseDetails.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Teléfono:</span>
            <span>{caseDetails.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Medida de Restablecimiento:</span>
            <span>{caseDetails.restorationMeasure}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;