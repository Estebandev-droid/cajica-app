// src/components/MeasureForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { 
  FaCalendarAlt, FaClipboardList, FaUser, FaPhone, 
  FaPlusCircle, FaTimes, FaIdCard, FaBalanceScale, FaStethoscope,
  FaUsers, FaMapMarker, FaFileMedical, FaHeartbeat, FaChild
} from 'react-icons/fa';

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
      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all 
                text-gray-700 shadow-sm hover:shadow-md bg-white relative"
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
    className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all 
              bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white 
              transform hover:scale-[1.02] active:scale-95 font-semibold text-lg min-w-[200px]`}
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

const MeasureForm = ({ onClose, onMeasureCreated }) => {
  const [newMeasure, setNewMeasure] = useState({
    caseNumber: '',
    autoAvocaDate: '',
    processStatus: '',
    criminalNewsNumber: '',
    typeOfViolence: '',
    injury: '',
    familyRelationship: '',
    victimName: '',
    victimDocumentType: '',
    victimDocumentNumber: '',
    victimGender: '',
    victimAge: '',
    victimAgeRange: '',
    victimPhone: '',
    victimSector: '',
    offenderName: '',
    offenderDocumentType: '',
    offenderDocumentNumber: '',
    offenderAge: '',
    offenderPhone: '',
  });

  const handleChange = (e) => {
    setNewMeasure({ ...newMeasure, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/measures`, newMeasure, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onMeasureCreated(response.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto border border-gray-100 
                     transform transition-all duration-300 hover:shadow-3xl">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-2xl shadow-inner">
              <FaFileMedical className="text-3xl text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Nueva Medida de Protección
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
            
            {/* Columna 1 - Información de la Medida */}
            <div className="space-y-6">
              <SectionHeader title="Información de la Medida" icon={FaClipboardList} color="text-blue-500" />
              
              <InputField 
                type="text" 
                name="caseNumber" 
                value={newMeasure.caseNumber} 
                onChange={handleChange} 
                placeholder="Número de Caso" 
                icon={FaClipboardList} 
              />
              <InputField 
                type="date" 
                name="autoAvocaDate" 
                value={newMeasure.autoAvocaDate} 
                onChange={handleChange} 
                placeholder="Fecha Auto Avoca" 
                icon={FaCalendarAlt} 
              />
              <InputField 
                type="text" 
                name="processStatus" 
                value={newMeasure.processStatus} 
                onChange={handleChange} 
                placeholder="Estado del Proceso" 
                icon={FaClipboardList} 
              />
              <InputField 
                type="text" 
                name="criminalNewsNumber" 
                value={newMeasure.criminalNewsNumber} 
                onChange={handleChange} 
                placeholder="Número de Noticia Criminal Fiscalía" 
                icon={FaClipboardList} 
              />
              <InputField 
                type="text" 
                name="typeOfViolence" 
                value={newMeasure.typeOfViolence} 
                onChange={handleChange} 
                placeholder="Tipo de Violencia" 
                icon={FaBalanceScale} 
              />
              <InputField 
                type="text" 
                name="injury" 
                value={newMeasure.injury} 
                onChange={handleChange} 
                placeholder="Lesión (Indicador Calidad)" 
                icon={FaStethoscope} 
              />
              <InputField 
                type="text" 
                name="familyRelationship" 
                value={newMeasure.familyRelationship} 
                onChange={handleChange} 
                placeholder="Parentesco Victima/Victimario" 
                icon={FaUsers} 
              />
            </div>

            {/* Columna 2 - Datos de la Víctima */}
            <div className="space-y-6">
              <SectionHeader title="Datos de la Víctima" icon={FaChild} color="text-purple-500" />
              
              <InputField 
                type="text" 
                name="victimName" 
                value={newMeasure.victimName} 
                onChange={handleChange} 
                placeholder="Nombres y Apellidos" 
                icon={FaUser} 
              />
              <InputField 
                type="text" 
                name="victimDocumentType" 
                value={newMeasure.victimDocumentType} 
                onChange={handleChange} 
                placeholder="Tipo de Documento" 
                icon={FaIdCard} 
              />
              <InputField 
                type="text" 
                name="victimDocumentNumber" 
                value={newMeasure.victimDocumentNumber} 
                onChange={handleChange} 
                placeholder="Número de Documento" 
                icon={FaIdCard} 
              />
              <InputField 
                type="text" 
                name="victimGender" 
                value={newMeasure.victimGender} 
                onChange={handleChange} 
                placeholder="Sexo" 
                icon={FaUser} 
              />
              <InputField 
                type="number" 
                name="victimAge" 
                value={newMeasure.victimAge} 
                onChange={handleChange} 
                placeholder="Edad" 
                icon={FaHeartbeat} 
              />
              <InputField 
                type="text" 
                name="victimAgeRange" 
                value={newMeasure.victimAgeRange} 
                onChange={handleChange} 
                placeholder="Rango de Edad" 
                icon={FaChild} 
              />
              <InputField 
                type="text" 
                name="victimPhone" 
                value={newMeasure.victimPhone} 
                onChange={handleChange} 
                placeholder="Teléfono" 
                icon={FaPhone} 
              />
              <InputField 
                type="text" 
                name="victimSector" 
                value={newMeasure.victimSector} 
                onChange={handleChange} 
                placeholder="Sector" 
                icon={FaMapMarker} 
              />
            </div>

            {/* Columna 3 - Datos del Victimario */}
            <div className="space-y-6">
              <SectionHeader title="Datos del Victimario" icon={FaUsers} color="text-red-500" />
              
              <InputField 
                type="text" 
                name="offenderName" 
                value={newMeasure.offenderName} 
                onChange={handleChange} 
                placeholder="Nombres y Apellidos" 
                icon={FaUser} 
              />
              <InputField 
                type="text" 
                name="offenderDocumentType" 
                value={newMeasure.offenderDocumentType} 
                onChange={handleChange} 
                placeholder="Tipo de Documento" 
                icon={FaIdCard} 
              />
              <InputField 
                type="text" 
                name="offenderDocumentNumber" 
                value={newMeasure.offenderDocumentNumber} 
                onChange={handleChange} 
                placeholder="Número de Documento" 
                icon={FaIdCard} 
              />
              <InputField 
                type="number" 
                name="offenderAge" 
                value={newMeasure.offenderAge} 
                onChange={handleChange} 
                placeholder="Edad" 
                icon={FaHeartbeat} 
              />
              <InputField 
                type="text" 
                name="offenderPhone" 
                value={newMeasure.offenderPhone} 
                onChange={handleChange} 
                placeholder="Teléfono" 
                icon={FaPhone} 
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
              text="Crear Medida" 
              icon={FaPlusCircle} 
              type="submit" 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeasureForm;