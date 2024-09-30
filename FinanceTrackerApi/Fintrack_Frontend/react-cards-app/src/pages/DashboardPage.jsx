import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card';
import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust token retrieval as necessary

        const budgetResponse = await axios.get('http://localhost:8000/api/budgets/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const incomeResponse = await axios.get('http://localhost:8000/api/incomes/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const expenseResponse = await axios.get('http://localhost:8000/api/expenses/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBudgets(budgetResponse.data);
        setIncomes(incomeResponse.data);
        setExpenses(expenseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Could not fetch data.'); // Handle the error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Convert amounts to numbers and calculate totals for cards
  const totalBudget = budgets.reduce((total, budget) => total + parseFloat(budget.amount), 0);
  const totalIncome = incomes.reduce((total, income) => total + parseFloat(income.amount), 0);
  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const cards = [
    {
      title: 'Total Balance',
      description: `$${(totalIncome - totalExpenses).toFixed(2)}`, // Ensure 2 decimal places
      icon: <FiDollarSign className="text-3xl text-green-500" />,
    },
    {
      title: 'Income',
      description: `$${totalIncome.toFixed(2)}`, // Ensure 2 decimal places
      icon: <FiTrendingUp className="text-3xl text-blue-500" />,
    },
    {
      title: 'Expenses',
      description: `$${totalExpenses.toFixed(2)}`, // Ensure 2 decimal places
      icon: <FiTrendingDown className="text-3xl text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} icon={card.icon} />
      ))}
    </div>
  );
};

export default Dashboard;
