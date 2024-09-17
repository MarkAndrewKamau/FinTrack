import React, { useState } from 'react';
import { signin } from '../services/authService'; // Import the signin function
import { useNavigate } from 'react-router-dom';

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

      // Save JWT token to localStorage
      if (response && response.access) {
        localStorage.setItem('token', response.access); // Save JWT token
      }

      // Redirect user to dashboard or home
      navigate('/profile');
    } catch (error) {
      console.error('Signin failed:', error);
      setErrorMessage('Signin failed. Invalid username or password.'); // Show error message to the user
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        
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
      </form>
    </div>
  );
};

export default Signin;
