import React from 'react';
import { FaApple, FaGoogle, FaFacebook, FaEthereum } from 'react-icons/fa';
import './Signup.css'
const Signup = () => {
    const handleMetaMaskLogin = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Connected account:', accounts[0]);
            } catch (error) {
                console.error('MetaMask login error:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    };

    return (
        <div className="signup-page">
            <h1>Create a new account</h1>
            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <div className="signup-options">
                <p>Or sign up with:</p>
                <div className="signup-buttons">
                    <button className="signup-button apple"><FaApple /> Apple</button>
                    <button className="signup-button google"><FaGoogle /> Google</button>
                    <button className="signup-button facebook"><FaFacebook /> Facebook</button>
                    <button className="signup-button metamask" onClick={handleMetaMaskLogin}><FaEthereum /> MetaMask</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
