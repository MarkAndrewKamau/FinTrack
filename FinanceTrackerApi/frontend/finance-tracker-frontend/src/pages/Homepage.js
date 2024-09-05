import React from 'react';
import Dashboard from '../components/Dashboard.js';
import ExpenseForm from '../components/ExpenseForm';
import IncomeForm from '../components/IncomeForm';

function HomePage() {
  const handleExpenseSubmit = (expense) => {
    // Handle expense submission
    console.log('New expense:', expense);
    // You would typically send this to your API
  };

  const handleIncomeSubmit = (income) => {
    // Handle income submission
    console.log('New income:', income);
    // You would typically send this to your API
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finance Tracker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Dashboard />
        </div>
        <div className="space-y-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Add Expense</h2>
            <ExpenseForm onSubmit={handleExpenseSubmit} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Add Income</h2>
            <IncomeForm onSubmit={handleIncomeSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;