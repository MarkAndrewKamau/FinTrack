import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FiHome, FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart, FiUser } from 'react-icons/fi';
import Card from './Card';
import Budget from './pages/BudgetPage';
import IncomePage from './pages/IncomePage';
import ExpensesPage from './pages/ExpensesPage';
import FinancialReport from './pages/FinancialReportPage';
import Profile from './pages/ProfilePage';

function App() {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const cards = [
    {
      title: 'Total Balance',
      description: '$10,000',
      icon: <FiDollarSign className="text-3xl text-green-500" />,
    },
    {
      title: 'Income',
      description: '$5,000',
      icon: <FiTrendingUp className="text-3xl text-blue-500" />,
    },
    {
      title: 'Expenses',
      description: '$3,000',
      icon: <FiTrendingDown className="text-3xl text-red-500" />,
    },
  ];

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-3xl font-bold text-blue-600">FinTracker</h1>
          </div>
          <nav className="mt-5">
            {[
              { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
              { name: 'Budget', icon: FiDollarSign, path: '/budget' },
              { name: 'Income', icon: FiTrendingUp, path: '/income' },
              { name: 'Expenses', icon: FiTrendingDown, path: '/expenses' },
              { name: 'Financial Report', icon: FiPieChart, path: '/FinancialReport' },
              { name: 'Profile', icon: FiUser, path: '/Profile' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center mt-4 py-2 px-6 ${
                  activeComponent === item.name
                    ? 'bg-blue-600 bg-opacity-25 text-blue-600'
                    : 'text-gray-500 hover:bg-blue-600 hover:bg-opacity-25 hover:text-blue-600'
                }`}
                onClick={() => handleClick(item.name)}
              >
                <item.icon className="h-5 w-5" />
                <span className="mx-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-blue-600">
            <h2 className="text-2xl font-semibold text-gray-800">{activeComponent}</h2>
            <div className="flex items-center">
              <button className="flex items-center text-gray-500 hover:text-blue-600">
                <FiUser className="h-5 w-5" />
                <span className="ml-2">John Doe</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cards.map((card, index) => (
                        <Card
                          key={index}
                          title={card.title}
                          description={card.description}
                          icon={card.icon}
                        />
                      ))}
                    </div>
                  }
                />
                <Route path="/budget" element={<Budget />} />
                <Route path="/income" element={<IncomePage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/FinancialReport" element={<FinancialReport />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
