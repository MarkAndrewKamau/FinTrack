import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
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

function App() {
  const location = useLocation(); // Get the current location

  return (
    <div className="App">
      {/* Render Header only if not on Signup page */}
      {location.pathname !== '/signup' && <Header />}
      <main>
        <Routes>
          {/* Redirect the root path to signup */}
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Public Routes for other pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
