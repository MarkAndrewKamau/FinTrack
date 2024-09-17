import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaEthereum } from 'react-icons/fa';
import './Signin.css';
import { signin } from '../services/authService'; // Import the signin function
import { useNavigate } from 'react-router-dom'; // Import useNavigate to redirect users

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
  const navigate = useNavigate(); // Initialize useNavigate for redirecting

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
      // Call the signin function from authServices.js
      const response = await signin(formData.email, formData.password);
      console.log('Signin successful:', response);

      // Save the JWT token in localStorage
      localStorage.setItem('token', response.access);
      
      // Redirect the user to the dashboard or another page
      navigate('/profile');

    } catch (error) {
      console.error('Signin failed:', error);
      setErrorMessage('Invalid email or password. Please try again.'); // Show error message to the user
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
      <div className="social-signin">
        <p>Or sign in with:</p>
        <div className="social-icons">
          <a href="/auth/google" className="social-icon" aria-label="Sign in with Google">
            <FaGoogle />
          </a>
          <a href="/auth/facebook" className="social-icon" aria-label="Sign in with Facebook">
            <FaFacebookF />
          </a>
          <a href="/auth/apple" className="social-icon" aria-label="Sign in with Apple">
            <FaApple />
          </a>
          <a href="/auth/metamask" className="social-icon" aria-label="Sign in with MetaMask">
            <FaEthereum />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;