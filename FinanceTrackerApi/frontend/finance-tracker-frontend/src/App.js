import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ExpensesPage from './pages/ExpensesPage';
import IncomePage from './pages/IncomePage';
import BudgetPage from './pages/BudgetPage';
import ReportPage from './pages/ReportPage';
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './components/Dashboard';

// Check if the user is authenticated (based on token in localStorage or session)
const isAuthenticated = () => {
  return !!localStorage.getItem('token');  // Checks if token exists
};

// Private Route component for protecting authenticated routes
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          {/* Redirect the root path to signup or dashboard based on authentication */}
          <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />} />

          {/* Protected Route for the dashboard */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Routes for other pages */}
          <Route path="/expenses" element={<PrivateRoute element={<ExpensesPage />} />} />
          <Route path="/income" element={<PrivateRoute element={<IncomePage />} />} />
          <Route path="/budget" element={<PrivateRoute element={<BudgetPage />} />} />
          <Route path="/report" element={<PrivateRoute element={<ReportPage />} />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
