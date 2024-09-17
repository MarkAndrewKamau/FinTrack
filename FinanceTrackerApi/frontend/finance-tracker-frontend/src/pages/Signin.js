import React, { useState } from 'react';
import { signin } from '../services/authService'; // Import the signin function
import './Signin.css'; // Import the CSS file for styling

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const result = await signin(email, password);
      console.log('Signin successful:', result);
      // Redirect or show a success message
    } catch (error) {
      console.error('Signin failed:', error);
      // Show an error message
    }
  };

  const handleGoogleSignin = () => {
    // Handle Google signin logic here
  };

  const handleAppleSignin = () => {
    // Handle Apple signin logic here
  };

  const handleFacebookSignin = () => {
    // Handle Facebook signin logic here
  };

  const handleMetaMaskSignin = () => {
    // Handle MetaMask signin logic here
  };

  return (
    <div className="signin-page">
      <div className="signin-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
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
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <div className="social-signin">
          <button onClick={handleGoogleSignin} className="google-signin">Sign In with Google</button>
          <button onClick={handleAppleSignin} className="apple-signin">Sign In with Apple</button>
          <button onClick={handleFacebookSignin} className="facebook-signin">Sign In with Facebook</button>
          <button onClick={handleMetaMaskSignin} className="metamask-signin">Sign In with MetaMask</button>
        </div>
        <div className="signin-options">
          <p>Don't have an account?</p>
          <a href="/signup" className="link-to-signup">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
