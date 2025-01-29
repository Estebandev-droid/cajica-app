import React, { useState } from 'react';
import axios from 'axios';
import { 
  FaCalendarAlt, FaClipboardList, FaUser, FaPhone, 
  FaPlusCircle, FaTimes, FaIdCard, FaBalanceScale, FaStethoscope,
  FaUsers, FaMapMarker, FaFileMedical, FaHeartbeat, FaChild
} from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const InputField = ({ type, name, value, onChange, placeholder, icon: Icon }) => (
  <div className="relative group transition-all duration-300 hover:transform hover:-translate-y-0.5">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-lg z-10" />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-4 border-0 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all 
                text-gray-800 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md relative text-sm font-medium
                placeholder-gray-400"
      required
    />
    {value && (
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">
        ✓
      </span>
    )}
  </div>
);

const ActionButton = ({ onClick, type = 'submit', text, icon: Icon }) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all 
              bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white 
              transform hover:scale-[1.02] active:scale-95 font-semibold text-sm min-w-[180px]
              hover:shadow-blue-200/30 group`}
  >
    <Icon className="text-lg transition-transform group-hover:rotate-12" />
    <span>{text}</span>
  </button>
);

const SectionHeader = ({ title, icon: Icon, color = "from-blue-500 to-blue-600" }) => (
  <div className={`flex items-center gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r ${color} shadow-md`}>
    <Icon className="text-2xl text-white" />
    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{title}</h3>
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
      console.error('Error creating measure:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto border border-gray-100 transform transition-all duration-300 hover:shadow-3xl relative">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <FaFileMedical className="text-2xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nueva Medida de Protección
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl bg-gray-100 hover:bg-red-100 transition-all shadow-sm hover:shadow-md group"
          >
            <FaTimes className="text-gray-600 text-lg group-hover:text-red-600 transition-colors" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Columna 1 - Información de la Medida */}
            <div className="space-y-6">
              <SectionHeader 
                title="Información de la Medida" 
                icon={FaClipboardList} 
                color="from-blue-600 to-blue-700"
              />
              
              <div className="space-y-5 bg-gray-50/50 p-5 rounded-2xl shadow-inner">
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
            </div>

            {/* Columna 2 - Datos de la Víctima */}
            <div className="space-y-6">
              <SectionHeader 
                title="Datos de la Víctima" 
                icon={FaChild} 
                color="from-purple-600 to-purple-700"
              />
              
              <div className="space-y-5 bg-gray-50/50 p-5 rounded-2xl shadow-inner">
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
            </div>

            {/* Columna 3 - Datos del Victimario */}
            <div className="space-y-6">
              <SectionHeader 
                title="Datos del Victimario" 
                icon={FaUsers} 
                color="from-red-600 to-red-700"
              />
              
              <div className="space-y-5 bg-gray-50/50 p-5 rounded-2xl shadow-inner">
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
          </div>

          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-4 justify-end mt-8 pt-8 border-t border-gray-100">
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