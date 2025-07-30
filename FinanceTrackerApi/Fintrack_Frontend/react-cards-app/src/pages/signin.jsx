import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signin } from '../services/authService';
import './signin.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await signin(formData.username, formData.password);
    if (response.access) {
      localStorage.setItem('token', response.access);
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Signin failed:', error);
    try {
      const newToken = await refreshToken();
      localStorage.setItem('token', newToken);
      navigate('/dashboard');
    } catch (refreshError) {
      console.error('Refresh failed:', refreshError);
      setErrorMessage('Invalid username or password. Refresh failed.');
    }
  }
};

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md p-8 neumorphic"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-4">Welcome Back</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">Sign in to continue</p>

        {errorMessage && (
          <motion.p
            className="text-red-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="input-field"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="input-field"
              aria-required="true"
            />
          </div>

          <motion.button
            type="submit"
            className="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sign In
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signin;