import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeasureDetails = () => {
  const { id } = useParams();
  const [measure, setMeasure] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeasure = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${BASE_URL}/measures/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMeasure(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeasure();
  }, [id, navigate]);

  if (!measure) {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Detalles de la Medida de Protección</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Número de Caso:</span>
            <span>{measure.caseNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Fecha Auto Avoca:</span>
            <span>{new Date(measure.autoAvocaDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Estado del Proceso:</span>
            <span>{measure.processStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Número de Noticia Criminal Fiscalía:</span>
            <span>{measure.criminalNewsNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tipo de Violencia:</span>
            <span>{measure.typeOfViolence}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Lesión (Indicador Calidad):</span>
            <span>{measure.injury}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Parentesco Victima/Victimario:</span>
            <span>{measure.familyRelationship}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Nombres y Apellidos de la Víctima:</span>
            <span>{measure.victimName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tipo de Documento de la Víctima:</span>
            <span>{measure.victimDocumentType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Número de Documento de la Víctima:</span>
            <span>{measure.victimDocumentNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Sexo de la Víctima:</span>
            <span>{measure.victimGender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Edad de la Víctima:</span>
            <span>{measure.victimAge}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Rango de Edad de la Víctima:</span>
            <span>{measure.victimAgeRange}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Teléfono de la Víctima:</span>
            <span>{measure.victimPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Sector de la Víctima:</span>
            <span>{measure.victimSector}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Nombres y Apellidos del Victimario:</span>
            <span>{measure.offenderName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tipo de Documento del Victimario:</span>
            <span>{measure.offenderDocumentType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Número de Documento del Victimario:</span>
            <span>{measure.offenderDocumentNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Edad del Victimario:</span>
            <span>{measure.offenderAge}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Teléfono del Victimario:</span>
            <span>{measure.offenderPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasureDetails;