import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new root API
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

// Create the root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap the App component with BrowserRouter */}
      <App />
    </Router>
  </React.StrictMode>
);
