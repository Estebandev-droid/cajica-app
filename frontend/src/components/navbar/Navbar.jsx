import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFolderOpen, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4 py-4">
      <div className="bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-gray-200/60">
        <div className="flex justify-center items-center p-2">
          {/* Elementos de Navegación */}
          <div className="flex justify-around w-full max-w-xs items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-full transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-indigo-500'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <FaHome className="w-6 h-6" />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-medium"
                    >
                      Home
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>

            <NavLink
              to="/case-manager"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-full transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-indigo-500'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <FaFolderOpen className="w-6 h-6" />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-medium"
                    >
                      Cases
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>

            <NavLink
              to="/upload-documents"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-full transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-indigo-500'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <FaUpload className="w-6 h-6" />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-medium"
                    >
                      Upload
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
