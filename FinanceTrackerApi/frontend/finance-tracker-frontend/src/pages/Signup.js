import React, { useState } from 'react';
import './Signup.css'; // Import the CSS file for styling
import { FaApple, FaGoogle, FaFacebook, FaEthereum } from 'react-icons/fa';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup:', { email, password });
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
        <div className="signup-options">
          <p>Already have an account?</p>
          <a href="/signin" className="link-to-signin">Sign in</a>
        </div>
        <div className="signup-buttons">
          <button className="signup-button apple"><FaApple /> Sign up with Apple</button>
          <button className="signup-button google"><FaGoogle /> Sign up with Google</button>
          <button className="signup-button facebook"><FaFacebook /> Sign up with Facebook</button>
          <button className="signup-button metamask"><FaEthereum /> Sign up with MetaMask</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
