import React, { useState, useEffect } from 'react';
import IncomeList from '../components/Income/IncomeList';
import IncomeForm from '../components/Income/IncomeForm';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; // Reuse for consistency

function IncomePage() {
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/incomes/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setIncomes(data);
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleIncomeSubmit = (newIncome) => {
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Manage Income</h1>
      <div className="nav-buttons">
        <Link to="/dashboard" className="nav-button">Dashboard</Link>
        <Link to="/income" className="nav-button active">Income</Link>
        <Link to="/expenses" className="nav-button">Expenses</Link>
        <Link to="/budget" className="nav-button">Budget</Link>
        <Link to="/financial-report" className="nav-button">Financial Report</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <IncomeList incomes={incomes} />
        </div>
        <div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Income</h2>
            <IncomeForm onSubmit={handleIncomeSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomePage;