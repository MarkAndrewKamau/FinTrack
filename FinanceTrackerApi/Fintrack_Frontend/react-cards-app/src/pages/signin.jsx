import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../services/authService';
import './signin.css'; // Keep this if you have custom styles; remove if using Tailwind only

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
      console.log('Signin successful:', response);

      if (response && response.access) {
        localStorage.setItem('token', response.access);
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid response from the server.');
      }
    } catch (error) {
      console.error('Signin failed:', error);
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="signin-container min-h-screen flex items-center justify-center bg-gray-100">
      <div className="signin-box w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="subtext text-lg text-gray-600 text-center mb-6">Sign in to continue</p>

        {errorMessage && <p className="error-message text-red-500 text-center mb-4">{errorMessage}</p>}

        <form className="signin-form space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="input-field w-full p-3 mt-1 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="input-field w-full p-3 mt-1 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="signin-button w-full p-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition">Sign In</button>
        </form>

        <div className="alternative-signin text-center mt-6">
          <p className="text-lg">Don't have an account? <a href="/signup" className="link text-blue-600 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;