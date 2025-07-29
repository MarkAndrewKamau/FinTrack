import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeContext } from './main';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Dashboard from './pages/DashboardPage';
import IncomePage from './pages/IncomePage';
import ExpensesPage from './pages/ExpensesPage';
import BudgetsPage from './pages/BudgetPage';
import FinancialReportPage from './pages/FinancialReportPage';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-dark'} transition-colors duration-300`}>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/budget" element={<BudgetsPage />} />
          <Route path="/financial-report" element={<FinancialReportPage />} />
        </Routes>
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white z-10 hover:shadow-lg transition-all duration-200"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </Router>
  );
}

export default App;