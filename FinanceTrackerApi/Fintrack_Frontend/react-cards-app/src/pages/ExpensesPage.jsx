import React, { useState, useEffect, useCallback } from 'react';
import ExpenseList from '../components/Expenses/ExpensesList';
import ExpenseForm from '../components/Expenses/ExpensesForm';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; // Reuse for consistency

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  const fetchExpenses = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/expenses/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setExpenses(data);
    } else {
      console.error('Failed to fetch expenses:', await response.json());
    }
  }, [token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleExpenseSubmit = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    fetchExpenses(); // Refresh the list from the API
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Manage Expenses</h1>
      <div className="nav-buttons">
        <Link to="/dashboard" className="nav-button">Dashboard</Link>
        <Link to="/income" className="nav-button">Income</Link>
        <Link to="/expenses" className="nav-button active">Expenses</Link>
        <Link to="/budget" className="nav-button">Budget</Link>
        <Link to="/financial-report" className="nav-button">Financial Report</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ExpenseList expenses={expenses} />
        </div>
        <div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <ExpenseForm onSubmit={handleExpenseSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;