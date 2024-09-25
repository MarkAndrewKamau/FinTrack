import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../services/authService'; // Import the signin function
import './Signin.css'; // Link to the corresponding CSS for styling

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

      // Check if the response contains an access token
      if (response && response.access) {
        localStorage.setItem('token', response.access); // Save JWT token
        navigate('/dashboard'); // Redirect user to dashboard after successful login
      } else {
        setErrorMessage('Invalid response from the server.'); // Handle invalid response
      }
    } catch (error) {
      console.error('Signin failed:', error);
      setErrorMessage('Invalid username or password.'); // Display error message
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Welcome Back</h2>
        <p className="subtext">Sign in to continue</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="input-field"
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
              placeholder="Enter your password"
              className="input-field"
            />
          </div>

          <button type="submit" className="signin-button">Sign In</button>
        </form>

        <div className="alternative-signin">
          <p>Don't have an account? <a href="/signup" className="link">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
