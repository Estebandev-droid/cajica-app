import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaHashtag, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeasureList = () => {
  const [measures, setMeasures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeasures = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/measures`, { headers: { Authorization: `Bearer ${token}` } });
        setMeasures(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeasures();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/measures/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMeasures(measures.filter(measure => measure._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Medidas de Protección</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-4 px-4"><FaHashtag className="inline mr-2" />Número de Caso</th>
                <th className="pb-4 px-4"><FaInfoCircle className="inline mr-2" />Estado</th>
                <th className="pb-4 px-4"><FaInfoCircle className="inline mr-2" />Tipo de Violencia</th>
                <th className="pb-4 px-4"><FaInfoCircle className="inline mr-2" />Lesión</th>
                <th className="pb-4 px-4"><FaInfoCircle className="inline mr-2" />Parentesco</th>
                <th className="pb-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {measures.map((measure) => (
                <tr key={measure._id} className="hover:bg-green-50 transition-colors cursor-pointer">
                  <td className="p-4 border-b border-gray-100 font-medium">{measure.caseNumber}</td>
                  <td className="p-4 border-b border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      measure.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {measure.status}
                    </span>
                  </td>
                  <td className="p-4 border-b border-gray-100">{measure.typeOfViolence}</td>
                  <td className="p-4 border-b border-gray-100">{measure.injury}</td>
                  <td className="p-4 border-b border-gray-100">{measure.familyRelationship}</td>
                  <td className="p-4 border-b border-gray-100 text-right flex gap-2">
                    <FaEdit className="text-blue-500 cursor-pointer" onClick={() => navigate(`/measures/edit/${measure._id}`)} />
                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(measure._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeasureList;