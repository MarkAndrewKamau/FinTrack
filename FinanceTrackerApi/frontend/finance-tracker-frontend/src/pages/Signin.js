import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaEthereum } from 'react-icons/fa';
import './Signin.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signin logic here
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
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
