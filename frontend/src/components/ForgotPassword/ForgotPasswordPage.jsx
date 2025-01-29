import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/reset-password`, { email });
      alert('Password reset link sent to your email');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleResetPassword}>
          <h2 className="text-3xl font-bold mb-6 text-white">Reset Password</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-transparent text-white placeholder-gray-400"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition">Reset Password</button>
          <p className="mt-4 text-center text-white">
            <button type="button" onClick={() => navigate('/login')} className="text-blue-300 hover:underline">Back to login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
