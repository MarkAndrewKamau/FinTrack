import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaEthereum } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      const response = await signup(formData.username, formData.email, formData.password);
      console.log('Signup successful:', response);

      if (response && response.access) {
        localStorage.setItem('token', response.access);
      }

      navigate('/signin');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.username) {
          setErrorMessage(`Username: ${errorData.username}`);
        } else if (errorData.email) {
          setErrorMessage(`Email: ${errorData.email}`);
        } else {
          setErrorMessage('Signup failed. Please try again.');
        }
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Panel */}
      <motion.div
        className="flex-1 bg-primary dark:bg-dark text-white flex items-center justify-center p-6 md:p-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FinTrack</h1>
          <p className="text-lg md:text-xl">
            Manage your finances with ease, transparency, and efficiency. Track your income, expenses, and savings in one place.
          </p>
          {/* Custom SVG Illustration */}
          <svg
            className="w-32 h-32 mx-auto mt-6"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" />
            <path d="M50 30V50L60 60" stroke="white" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        className="flex-1 flex items-center justify-center p-6 md:p-10 bg-gray-100 dark:bg-gray-900"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md neumorphic p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
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
              Sign Up
            </motion.button>

            <div className="text-center mt-4">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <a href="/signin" className="text-primary hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </form>

          <div className="social-signup text-center mt-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">Or sign up with:</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="/auth/google" className="social-icon" aria-label="Sign up with Google">
                <FaGoogle size={24} />
              </a>
              <a href="/auth/facebook" className="social-icon" aria-label="Sign up with Facebook">
                <FaFacebookF size={24} />
              </a>
              <a href="/auth/apple" className="social-icon" aria-label="Sign up with Apple">
                <FaApple size={24} />
              </a>
              <a href="/auth/metamask" className="social-icon" aria-label="Sign up with MetaMask">
                <FaEthereum size={24} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;