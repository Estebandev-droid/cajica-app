import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EditPardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState({
    knowledgeDate: '',
    openingDate: '',
    status: '',
    consultationReason: '',
    violatedRight: '',
    injury: '',
    familyRelationship: '',
    nnaName: '',
    birthDate: '',
    age: '',
    documentType: '',
    historyNumber: '',
    eps: '',
    residenceSector: '',
    address: '',
    phone: '',
    restorationMeasure: '',
  });

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/cases/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCaseDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const handleChange = (e) => {
    setCaseDetails({ ...caseDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BASE_URL}/cases/${id}`, caseDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/pard-list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar Caso PARD</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Fecha de Conocimiento</label>
              <input
                type="date"
                name="knowledgeDate"
                value={caseDetails.knowledgeDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Fecha de Apertura</label>
              <input
                type="date"
                name="openingDate"
                value={caseDetails.openingDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Estado</label>
              <input
                type="text"
                name="status"
                value={caseDetails.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Motivo de Consulta</label>
              <input
                type="text"
                name="consultationReason"
                value={caseDetails.consultationReason}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Derecho Vulnerado</label>
              <input
                type="text"
                name="violatedRight"
                value={caseDetails.violatedRight}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Lesión</label>
              <input
                type="text"
                name="injury"
                value={caseDetails.injury}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Parentesco con Agresor</label>
              <input
                type="text"
                name="familyRelationship"
                value={caseDetails.familyRelationship}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Nombre del NNA</label>
              <input
                type="text"
                name="nnaName"
                value={caseDetails.nnaName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                name="birthDate"
                value={caseDetails.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Edad</label>
              <input
                type="number"
                name="age"
                value={caseDetails.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Tipo de Documento</label>
              <input
                type="text"
                name="documentType"
                value={caseDetails.documentType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Número de Historia</label>
              <input
                type="text"
                name="historyNumber"
                value={caseDetails.historyNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">EPS</label>
              <input
                type="text"
                name="eps"
                value={caseDetails.eps}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Sector de Residencia</label>
              <input
                type="text"
                name="residenceSector"
                value={caseDetails.residenceSector}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Dirección</label>
              <input
                type="text"
                name="address"
                value={caseDetails.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={caseDetails.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Medida de Restablecimiento</label>
              <input
                type="text"
                name="restorationMeasure"
                value={caseDetails.restorationMeasure}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/pard-list')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <FaTimes />
              <span>Cancelar</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaSave />
              <span>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPardForm;