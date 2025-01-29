import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus, FaUndo, FaArrowLeft } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LoginPage = () => {
  // Estados
  const [isRegister, setIsRegister] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setName] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/cases');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
      navigate('/cases');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrarse');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/reset-password`, { email });
      alert('Enlace de recuperación enviado a tu correo');
      setIsResetPassword(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Error al restablecer contraseña');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-10 max-w-md w-full transform transition-all duration-300 hover:shadow-3xl">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200 flex items-center gap-3 animate-fade-in">
            <FaLock className="text-red-500 text-lg flex-shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!isRegister && !isResetPassword && (
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100/80 rounded-2xl backdrop-blur-sm">
                <FaSignInAlt className="text-3xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido</h2>
              <p className="text-slate-500 text-sm">Ingresa tus credenciales para continuar</p>
            </div>

            <div className="space-y-5">
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all group"
            >
              <FaSignInAlt className="text-lg transition-transform group-hover:translate-x-1" />
              <span className="text-lg font-medium">Iniciar Sesión</span>
            </button>

            <div className="mt-6 text-center space-x-3">
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline underline-offset-4"
              >
                Crear cuenta
              </button>
              <span className="text-slate-400">•</span>
              <button
                type="button"
                onClick={() => setIsResetPassword(true)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline underline-offset-4"
              >
                Recuperar acceso
              </button>
            </div>
          </form>
        )}

        {isRegister && (
          <form onSubmit={handleRegister} className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FaArrowLeft className="text-slate-600 text-lg" />
              </button>
              <div className="text-center flex-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100/80 rounded-xl mb-3">
                  <FaUserPlus className="text-xl text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Nueva Cuenta</h2>
                <p className="text-slate-500 text-sm mt-1">Completa el formulario para registrarte</p>
              </div>
              <div className="w-10"></div>
            </div>

            <div className="space-y-5">
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all group"
            >
              <FaUserPlus className="text-lg transition-transform group-hover:scale-110" />
              <span className="text-lg font-medium">Registrarse</span>
            </button>
          </form>
        )}

        {isResetPassword && (
          <form onSubmit={handleResetPassword} className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <button
                type="button"
                onClick={() => setIsResetPassword(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FaArrowLeft className="text-slate-600 text-lg" />
              </button>
              <div className="text-center flex-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100/80 rounded-xl mb-3">
                  <FaUndo className="text-xl text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Recuperar Acceso</h2>
                <p className="text-slate-500 text-sm mt-1">Ingresa tu correo para restablecer</p>
              </div>
              <div className="w-10"></div>
            </div>

            <div className="space-y-5">
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all group"
            >
              <FaUndo className="text-lg animate-spin-slow group-hover:animate-spin" />
              <span className="text-lg font-medium">Restablecer Contraseña</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;