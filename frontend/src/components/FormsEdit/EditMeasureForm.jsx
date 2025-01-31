import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EditMeasureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [measure, setMeasure] = useState({
    caseNumber: '',
    status: '',
    typeOfViolence: '',
    injury: '',
    familyRelationship: '',
  });

  useEffect(() => {
    const fetchMeasure = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/measures/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeasure(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeasure();
  }, [id]);

  const handleChange = (e) => {
    setMeasure({ ...measure, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BASE_URL}/measures/${id}`, measure, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/measure-list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar Medida de Protección</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Número de Caso</label>
              <input
                type="text"
                name="caseNumber"
                value={measure.caseNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Estado</label>
              <input
                type="text"
                name="status"
                value={measure.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Tipo de Violencia</label>
              <input
                type="text"
                name="typeOfViolence"
                value={measure.typeOfViolence}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Lesión</label>
              <input
                type="text"
                name="injury"
                value={measure.injury}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Parentesco</label>
              <input
                type="text"
                name="familyRelationship"
                value={measure.familyRelationship}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/measure-list')}
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

export default EditMeasureForm;