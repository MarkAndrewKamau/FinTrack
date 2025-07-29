import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card';
import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import './DashboardPage.css';

const Dashboard = () => {
  console.log('Dashboard rendering'); // Debug log
  const [budgets, setBudgets] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token being used:', token); // Debug log

        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const [budgetResponse, incomeResponse, expenseResponse] = await Promise.all([
          axios.get(`${baseUrl}/budgets/`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/incomes/`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/expenses/`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setBudgets(budgetResponse.data);
        setIncomes(incomeResponse.data);
        setExpenses(expenseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data. Using sample data.');
        
        // Fallback mock data
        setBudgets([
          { id: 1, amount: 2000, category: 'Food' },
          { id: 2, amount: 1500, category: 'Transportation' },
        ]);
        setIncomes([
          { id: 1, amount: 5000, source: 'Salary' },
          { id: 2, amount: 500, source: 'Freelance' },
        ]);
        setExpenses([
          { id: 1, amount: 1200, category: 'Food' },
          { id: 2, amount: 800, category: 'Transportation' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return (
    <div className="text-center text-red-600">
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Retry
      </button>
    </div>
  );

  const totalBudget = budgets.reduce((total, budget) => total + (parseFloat(budget.amount) || 0), 0);
  const totalIncome = incomes.reduce((total, income) => total + (parseFloat(income.amount) || 0), 0);
  const totalExpenses = expenses.reduce((total, expense) => total + (parseFloat(expense.amount) || 0), 0);

  const cards = [
    {
      title: 'Total Balance',
      description: `$${(totalIncome - totalExpenses).toFixed(2)}`,
      icon: <FiDollarSign className="text-3xl text-green-500" />,
    },
    {
      title: 'Income',
      description: `$${totalIncome.toFixed(2)}`,
      icon: <FiTrendingUp className="text-3xl text-blue-500" />,
    },
    {
      title: 'Expenses',
      description: `$${totalExpenses.toFixed(2)}`,
      icon: <FiTrendingDown className="text-3xl text-red-500" />,
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      {error && <div className="warning-banner"><p>{error}</p></div>}
      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} icon={card.icon} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;