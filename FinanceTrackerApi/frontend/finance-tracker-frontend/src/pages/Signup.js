import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaEthereum } from 'react-icons/fa';
import './Signup.css';
import { signup } from '../services/authService'; // Import the signup function
import { useNavigate } from 'react-router-dom'; // Import useNavigate to redirect users

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      // Call the signup function from authServices.js
      const response = await signup(formData.username, formData.email, formData.password);
      console.log('Signup successful:', response);
  
      // Save JWT token to localStorage
      if (response && response.access) {
        localStorage.setItem('token', response.access); // Save JWT token
      }
  
      // Redirect the user to the signin page
      navigate('/signin');
  
    } catch (error) {
      // Check if the error has a response with validation messages
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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit" className="signup-button">Sign Up</button>
        <p>Already have an account? <a href="/signin">Sign In</a></p>
      </form>
      <div className="social-signup">
        <p>Or sign up with:</p>
        <div className="social-icons">
          <a href="/auth/google" className="social-icon" aria-label="Sign up with Google">
            <FaGoogle />
          </a>
          <a href="/auth/facebook" className="social-icon" aria-label="Sign up with Facebook">
            <FaFacebookF />
          </a>
          <a href="/auth/apple" className="social-icon" aria-label="Sign up with Apple">
            <FaApple />
          </a>
          <a href="/auth/metamask" className="social-icon" aria-label="Sign up with MetaMask">
            <FaEthereum />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
