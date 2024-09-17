import React, { useState } from 'react';
import { signup } from '../services/authService'; // Import the signup function
import './Signup.css'; // Import the CSS file for styling

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(email, password);
      console.log('Signup successful:', result);
      // Redirect or show a success message
    } catch (error) {
      console.error('Signup failed:', error);
      // Show an error message
    }
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
  };

  const handleAppleSignup = () => {
    // Handle Apple signup logic here
  };

  const handleFacebookSignup = () => {
    // Handle Facebook signup logic here
  };

  const handleMetaMaskSignup = () => {
    // Handle MetaMask signup logic here
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="social-signup">
          <button onClick={handleGoogleSignup} className="google-signup">Sign Up with Google</button>
          <button onClick={handleAppleSignup} className="apple-signup">Sign Up with Apple</button>
          <button onClick={handleFacebookSignup} className="facebook-signup">Sign Up with Facebook</button>
          <button onClick={handleMetaMaskSignup} className="metamask-signup">Sign Up with MetaMask</button>
        </div>
        <div className="signup-options">
          <p>Already have an account?</p>
          <a href="/signin" className="link-to-signin">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
