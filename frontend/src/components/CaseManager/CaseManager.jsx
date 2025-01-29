import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import MeasureForm from '../forms/MeasureForm';
import PardForm from '../forms/PardForm';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaFileAlt, FaShieldAlt, FaHashtag, FaInfoCircle, FaChevronRight } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CaseManager = () => {
  const [cases, setCases] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isPardModalOpen, setIsPardModalOpen] = useState(false);
  const [isMeasureModalOpen, setIsMeasureModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
          return;
        }

        const [casesRes, measuresRes] = await Promise.all([
          axios.get(`${BASE_URL}/cases`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/measures`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setCases(casesRes.data);
        setMeasures(measuresRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleCaseCreated = (newCase) => {
    setCases(prev => [...prev, newCase]);
  };

  const handleMeasureCreated = (newMeasure) => {
    setMeasures(prev => [...prev, newMeasure]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Contenedor principal elevado */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-10">
            {/* Header */}
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FaFileAlt className="text-4xl text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Gestor de Casos
                  <span className="block text-lg font-normal text-gray-500 mt-2">
                    {cases.length + measures.length} elementos registrados
                  </span>
                </h1>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-5 mb-14">
              <button
                onClick={() => setIsPardModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02]"
              >
                <FaPlus className="text-lg" />
                <span className="text-lg">Nuevo PARD</span>
              </button>

              <button
                onClick={() => setIsMeasureModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02]"
              >
                <FaPlus className="text-lg" />
                <span className="text-lg">Nueva Medida</span>
              </button>
            </div>

            {/* Contenido */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sección PARD Cases */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                    <FaFileAlt className="text-white" />
                    Casos PARD
                  </h2>
                </div>
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-600 border-b">
                        <th className="pb-4 px-4"><FaHashtag className="inline mr-2" />Número de Caso</th>
                        <th className="pb-4 px-4"><FaInfoCircle className="inline mr-2" />Estado</th>
                        <th className="pb-4 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map((caseItem) => (
                        <tr 
                          key={caseItem._id} 
                          className="hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/cases/${caseItem._id}`)}
                        >
                          <td className="p-4 border-b border-gray-100 font-medium">{caseItem.caseNumber}</td>
                          <td className="p-4 border-b border-gray-100">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              caseItem.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {caseItem.status}
                            </span>
                          </td>
                          <td className="p-4 border-b border-gray-100 text-right">
                            <FaChevronRight className="text-gray-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sección Protection Measures */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                  <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                    <FaShieldAlt className="text-white" />
                    Medidas de Protección
                  </h2>
                </div>
                <div className="p-6">
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
                        <tr 
                          key={measure._id} 
                          className="hover:bg-green-50 transition-colors cursor-pointer"
                          onClick={() => navigate(`/measures/${measure._id}`)}
                        >
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
                          <td className="p-4 border-b border-gray-100 text-right">
                            <FaChevronRight className="text-gray-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={isPardModalOpen}
          onRequestClose={() => setIsPardModalOpen(false)}
          className="modal-content bg-white rounded-2xl p-8 max-w-2xl mx-auto mt-20 shadow-2xl border border-gray-200"
          overlayClassName="modal-overlay fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          ariaHideApp={false}
        >
          <PardForm 
            onClose={() => setIsPardModalOpen(false)} 
            onCaseCreated={handleCaseCreated} 
          />
        </Modal>

        <Modal
          isOpen={isMeasureModalOpen}
          onRequestClose={() => setIsMeasureModalOpen(false)}
          className="modal-content bg-white rounded-2xl p-8 max-w-2xl mx-auto mt-20 shadow-2xl border border-gray-200"
          overlayClassName="modal-overlay fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          ariaHideApp={false}
        >
          <MeasureForm 
            onClose={() => setIsMeasureModalOpen(false)} 
            onMeasureCreated={handleMeasureCreated} 
          />
        </Modal>
      </div>
    </div>
  );
};

export default CaseManager;