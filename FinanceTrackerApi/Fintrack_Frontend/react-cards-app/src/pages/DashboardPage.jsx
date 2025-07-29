import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiRefreshCw, FiMenu, FiX } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Custom illustration SVG (wallet icon)
const WalletIllustration = () => (
  <svg className="w-20 h-20 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm0 2v8h16V8H4zm2 2h4a1 1 0 010 2H6a1 1 0 010-2zm0 4h8a1 1 0 010 2H6a1 1 0 010-2z" fill="currentColor" />
  </svg>
);

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        console.log('Fetching from:', `${apiBaseUrl}budgets/`, 'with token:', token);

        const [budgetResponse, incomeResponse, expenseResponse] = await Promise.all([
          axios.get(`${apiBaseUrl}budgets/`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiBaseUrl}incomes/`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiBaseUrl}expenses/`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setBudgets(budgetResponse.data);
        setIncomes(incomeResponse.data);
        setExpenses(expenseResponse.data);
      } catch (error) {
        console.error('Fetch error:', error.response?.status, error.response?.data || error.message);
        setError('Could not fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-lg text-[var(--primary)]">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  // Default to 0 if no data
  const totalBudget = budgets.length ? budgets.reduce((total, budget) => total + parseFloat(budget.amount || 0), 0) : 0;
  const totalIncome = incomes.length ? incomes.reduce((total, income) => total + parseFloat(income.amount || 0), 0) : 0;
  const totalExpenses = expenses.length ? expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0) : 0;

  const cards = [
    { title: 'Total Balance', value: (totalIncome - totalExpenses) || 0, icon: <FiDollarSign className="text-3xl text-green-500" /> },
    { title: 'Income', value: totalIncome, icon: <FiTrendingUp className="text-3xl text-[var(--secondary)]" /> },
    { title: 'Expenses', value: totalExpenses, icon: <FiTrendingDown className="text-3xl text-[var(--primary)]" /> },
  ];

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#45B7D1', '#FF6B6B'],
        borderWidth: 0,
      },
    ],
  };

  const filteredData = {
    overview: { incomes, expenses, budgets },
    income: { incomes },
    budget: { budgets },
    expenses: { expenses },
    'financial-report': { incomes, expenses, budgets },
  }[activeSection];

  const renderContent = () => {
    if (activeSection === 'overview') {
      return (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="neumorphic p-6 rounded-xl bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                  {card.icon}
                </div>
                <p className="text-3xl font-bold">${card.value.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
          <div className="neumorphic p-6 rounded-xl mb-6 bg-[var(--bg-light)] dark:bg-[var(--bg-dark)]">
            <h2 className="text-2xl font-semibold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-4">Financial Overview</h2>
            <div className="h-64">
              <Doughnut ref={chartRef} data={chartData} />
            </div>
          </div>
          <div className="neumorphic p-6 rounded-xl bg-[var(--bg-light)] dark:bg-[var(--bg-dark)]">
            <h2 className="text-2xl font-semibold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-4">Recent Transactions</h2>
            <div className="max-h-60 overflow-y-auto">
              {[...incomes, ...expenses].slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <span>{item.description || 'Unnamed Transaction'}</span>
                  <span>${parseFloat(item.amount || 0).toFixed(2)} {item.type === 'income' ? '(+)' : '(-)'}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
    const sectionData = filteredData[Object.keys(filteredData)[0]] || [];
    return (
      <div className="neumorphic p-6 rounded-xl bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)]">
        <h2 className="text-2xl font-semibold mb-4">{activeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
        {sectionData.length > 0 ? (
          <div className="max-h-60 overflow-y-auto">
            {sectionData.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <span>{item.description || 'Unnamed Item'}</span>
                <span>${parseFloat(item.amount || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No {activeSection} data available. Add some to get started!</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] transition-colors duration-300">
      {/* Sidebar */}
      <motion.div
        className={`fixed lg:static lg:w-64 h-screen bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] p-4 shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} lg:w-64 z-50`}
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : '-100%' }}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-[var(--text-light)] dark:text-[var(--text-dark)]"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <nav className="mt-12 lg:mt-0">
          <ul className="space-y-2">
            {['overview', 'income', 'budget', 'expenses', 'financial-report'].map((section) => (
              <motion.li key={section} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <button
                  className={`w-full text-left p-2 rounded-lg ${activeSection === section ? 'bg-[var(--secondary)] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'} transition-colors duration-200`}
                  onClick={() => {
                    setActiveSection(section);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                >
                  {section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.header className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] tracking-[-0.5px] bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Dashboard
            </motion.h1>
            <WalletIllustration className="mx-auto mt-4" />
          </motion.header>
          {renderContent()}
          <motion.button
            className="button w-full mt-6"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 107, 107, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.location.reload()}
          >
            <FiRefreshCw className="inline mr-2" /> Refresh
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;