import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, { email, password });
      navigate('/cases'); // Redirigir al Gestor de Casos después del registro
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <form onSubmit={handleRegister} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create Account</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white p-3 rounded-xl hover:shadow-lg transition"
          >
            Register
          </button>
          <p className="mt-4 text-center text-gray-800">
            <button type="button" onClick={() => navigate('/login')} className="text-blue-500 hover:underline">Back to login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
