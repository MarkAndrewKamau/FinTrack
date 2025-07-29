import React from 'react';
import FinancialReport from '../components/FinancialReport/FinancialReport';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; // Reuse for consistency

const FinancialReportPage = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Financial Report</h1>
      <div className="nav-buttons">
        <Link to="/dashboard" className="nav-button">Dashboard</Link>
        <Link to="/income" className="nav-button">Income</Link>
        <Link to="/expenses" className="nav-button">Expenses</Link>
        <Link to="/budget" className="nav-button">Budget</Link>
        <Link to="/financial-report" className="nav-button active">Financial Report</Link>
      </div>
      <FinancialReport />
    </div>
  );
};

export default FinancialReportPage;