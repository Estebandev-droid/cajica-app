import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UploadDocumentsPage = () => {
  const [files, setFiles] = useState([null, null, null, null]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/files`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleUpload = async (index) => {
    const file = files[index];
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setUploadingIndex(index);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      
      setFiles([null, null, null, null]);
      const response = await axios.get(`${BASE_URL}/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploadingIndex(null);
    }
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { scale: 1.02 },
  };

  const listItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-800 mb-12 text-center"
        >
          Document Management
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {files.map((file, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-slate-200 hover:border-indigo-200 transition-all flex flex-col items-center relative"
            >
              <div className="absolute top-4 right-4">
                {uploadingIndex === index ? (
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                ) : files[index] ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-200" />
                )}
              </div>

              <div className="bg-indigo-50 p-4 rounded-full mb-6">
                <FileText className="text-indigo-600 w-8 h-8" />
              </div>

              <h2 className="text-lg font-semibold text-slate-700 mb-4">
                Document {index + 1}
              </h2>

              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => handleFileChange(index, event)}
                className="hidden"
                id={`file-upload-${index}`}
              />

              <label
                htmlFor={`file-upload-${index}`}
                className="cursor-pointer bg-indigo-50 text-indigo-700 px-6 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors mb-4"
              >
                {files[index] ? files[index].name : 'Select File'}
              </label>

              <button
                onClick={() => handleUpload(index)}
                disabled={uploadingIndex === index}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                {uploadingIndex === index ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
                {uploadingIndex === index ? 'Uploading...' : 'Upload'}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white shadow-lg rounded-xl p-8 border border-slate-200"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Uploaded Documents
          </h2>

          <div className="space-y-4">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <a
                    href={`${BASE_URL.replace('/api', '')}/uploads/${file.fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition-colors"
                  >
                    <FileText className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{file.originalName}</span>
                  </a>
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                </motion.div>
              ))
            ) : (
              <div className="text-center p-8">
                <div className="inline-flex flex-col items-center text-slate-400">
                  <AlertCircle className="w-8 h-8 mb-4" />
                  <p className="font-medium">No documents uploaded yet</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadDocumentsPage;