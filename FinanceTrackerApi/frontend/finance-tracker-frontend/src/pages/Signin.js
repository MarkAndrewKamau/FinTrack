import React, { useState } from 'react';
import './Signin.css'; // Import the CSS file for styling

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    // Add your signin logic here
    console.log('Signin:', { email, password });
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
        <div className="signin-options">
          <p>Don't have an account?</p>
          <a href="/signup" className="link-to-signup">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
