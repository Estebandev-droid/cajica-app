import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BASE_URL}/cases/${id}`, caseDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!caseDetails) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Case Details</h2>
        {isEditing ? (
          <form className="space-y-4">
            <input
              type="text"
              name="caseNumber"
              value={caseDetails.caseNumber}
              onChange={handleChange}
              placeholder="Case Number"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="status"
              value={caseDetails.status}
              onChange={handleChange}
              placeholder="Status"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {/* Add other fields as needed */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-700 transition"
            >
              Save
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Case Number:</strong> {caseDetails.caseNumber}</p>
            <p><strong>Status:</strong> {caseDetails.status}</p>
            {/* Add other fields as needed */}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-700 transition"
            >
              Edit
            </button>
          </div>
        )}
        <button
          onClick={() => navigate('/cases')}
          className="w-full bg-gray-500 text-white p-3 rounded-xl hover:bg-gray-700 transition mt-4"
        >
          Back to Cases
        </button>
      </div>
    </div>
  );
};

export default CaseDetails;