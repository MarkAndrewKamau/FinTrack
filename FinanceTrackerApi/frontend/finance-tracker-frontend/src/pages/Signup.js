import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple, FaEthereum } from 'react-icons/fa';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    // Handle signup logic here
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
