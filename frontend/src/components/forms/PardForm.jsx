import React, { useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClipboardList, FaUser, FaHome, FaPhone, FaPlusCircle, FaTimes, FaIdCard, FaBalanceScale, FaStethoscope, FaUsers, FaMapMarker, FaFileMedical, FaHeartbeat, FaChild, FaCity, FaNotesMedical, FaHandHoldingHeart } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const InputField = ({ type, name, value, onChange, placeholder, icon: Icon }) => (
  <div className="relative group transition-all duration-200">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors text-lg z-10" />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-700 shadow-sm hover:shadow-md bg-white relative"
      required
    />
    {value && (
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
        ✓
      </span>
    )}
  </div>
);

const ActionButton = ({ onClick, type = 'submit', text, icon: Icon }) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transform hover:scale-[1.02] active:scale-95 font-semibold text-lg min-w-[200px]`}
  >
    <Icon className="text-xl transition-transform group-hover:rotate-12" />
    <span>{text}</span>
  </button>
);

const SectionHeader = ({ title, icon: Icon, color = "text-blue-500" }) => (
  <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
    <Icon className={`text-2xl ${color} shrink-0`} />
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
  </div>
);

const PardForm = ({ onClose, onCaseCreated }) => {
  const [newCase, setNewCase] = useState({
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

  const handleChange = (e) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/cases`, newCase, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onCaseCreated(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto border border-gray-100 transform transition-all duration-300 hover:shadow-3xl">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-2xl shadow-inner">
              <FaFileMedical className="text-3xl text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Nuevo Caso PARD
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all shadow-sm hover:shadow-md"
          >
            <FaTimes className="text-gray-600 text-xl hover:text-red-600 transition-colors" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Columna 1 - Información Personal */}
            <div className="space-y-6">
              <SectionHeader title="Datos Personales" icon={FaChild} color="text-purple-500" />
              
              <InputField 
                type="text" 
                name="nnaName" 
                value={newCase.nnaName} 
                onChange={handleChange} 
                placeholder="Nombre completo del NNA" 
                icon={FaUser} 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  type="date" 
                  name="birthDate" 
                  value={newCase.birthDate} 
                  onChange={handleChange} 
                  placeholder="Fecha de nacimiento" 
                  icon={FaCalendarAlt} 
                />
                <InputField 
                  type="number" 
                  name="age" 
                  value={newCase.age} 
                  onChange={handleChange} 
                  placeholder="Edad" 
                  icon={FaHeartbeat} 
                />
              </div>
              
              <InputField 
                type="text" 
                name="documentType" 
                value={newCase.documentType} 
                onChange={handleChange} 
                placeholder="Tipo de documento" 
                icon={FaIdCard} 
              />
              <InputField 
                type="text" 
                name="historyNumber" 
                value={newCase.historyNumber} 
                onChange={handleChange} 
                placeholder="Número de historia" 
                icon={FaClipboardList} 
              />
            </div>

            {/* Columna 2 - Detalles del Caso */}
            <div className="space-y-6">
              <SectionHeader title="Detalles del Caso" icon={FaBalanceScale} color="text-green-500" />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  type="date" 
                  name="knowledgeDate" 
                  value={newCase.knowledgeDate} 
                  onChange={handleChange} 
                  placeholder="Fecha de conocimiento" 
                  icon={FaCalendarAlt} 
                />
                <InputField 
                  type="date" 
                  name="openingDate" 
                  value={newCase.openingDate} 
                  onChange={handleChange} 
                  placeholder="Fecha de apertura" 
                  icon={FaCalendarAlt} 
                />
              </div>
              
              <InputField 
                type="text" 
                name="status" 
                value={newCase.status} 
                onChange={handleChange} 
                placeholder="Estado del caso" 
                icon={FaClipboardList} 
              />
              
              <InputField 
                type="text" 
                name="violatedRight" 
                value={newCase.violatedRight} 
                onChange={handleChange} 
                placeholder="Derecho vulnerado" 
                icon={FaHandHoldingHeart} 
              />
              <InputField 
                type="text" 
                name="consultationReason" 
                value={newCase.consultationReason} 
                onChange={handleChange} 
                placeholder="Motivo de consulta" 
                icon={FaNotesMedical} 
              />
              <InputField 
                type="text" 
                name="injury" 
                value={newCase.injury} 
                onChange={handleChange} 
                placeholder="Lesión" 
                icon={FaStethoscope} 
              />
            </div>

            {/* Columna 3 - Ubicación y Contacto */}
            <div className="space-y-6">
              <SectionHeader title="Ubicación y Contacto" icon={FaCity} color="text-orange-500" />
              
              <InputField 
                type="text" 
                name="address" 
                value={newCase.address} 
                onChange={handleChange} 
                placeholder="Dirección completa" 
                icon={FaHome} 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  type="text" 
                  name="residenceSector" 
                  value={newCase.residenceSector} 
                  onChange={handleChange} 
                  placeholder="Sector de residencia" 
                  icon={FaMapMarker} 
                />
                <InputField 
                  type="text" 
                  name="phone" 
                  value={newCase.phone} 
                  onChange={handleChange} 
                  placeholder="Teléfono de contacto" 
                  icon={FaPhone} 
                />
              </div>
              
              <InputField 
                type="text" 
                name="eps" 
                value={newCase.eps} 
                onChange={handleChange} 
                placeholder="EPS" 
                icon={FaNotesMedical} 
              />
            </div>
          </div>

          {/* Sección Adicional */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <SectionHeader title="Información Adicional" icon={FaStethoscope} color="text-blue-600" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                type="text" 
                name="familyRelationship" 
                value={newCase.familyRelationship} 
                onChange={handleChange} 
                placeholder="Parentesco con agresor" 
                icon={FaUsers} 
              />
              
              <InputField 
                type="text" 
                name="restorationMeasure" 
                value={newCase.restorationMeasure} 
                onChange={handleChange} 
                placeholder="Medida de restablecimiento" 
                icon={FaHandHoldingHeart} 
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-4 justify-end mt-8 border-t border-gray-200 pt-6">
            <ActionButton 
              text="Cancelar" 
              icon={FaTimes} 
              onClick={onClose} 
            />
            <ActionButton 
              text="Crear Caso" 
              icon={FaPlusCircle} 
              type="submit" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PardForm;