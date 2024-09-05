import React, { useState, useEffect } from 'react';
import BudgetForm from '../components/BudgetForm';

function BudgetPage() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    // Fetch budgets from API
    // This is a placeholder. Replace with actual API call.
    const fetchBudgets = async () => {
      const response = await fetch('/api/budgets');
      const data = await response.json();
      setBudgets(data);
    };

    fetchBudgets();
  }, []);

  const handleBudgetSubmit = (budget) => {
    // Handle budget submission
    console.log('New budget:', budget);
    // You would typically send this to your API and then refresh the budgets list
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Budget</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Current Budgets</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Category</th>
                  <th className="text-right">Amount</th>
                  <th className="text-right">Start Date</th>
                  <th className="text-right">End Date</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td>{budget.category}</td>
                    <td className="text-right">${budget.amount.toFixed(2)}</td>
                    <td className="text-right">{new Date(budget.startDate).toLocaleDateString()}</td>
                    <td className="text-right">{new Date(budget.endDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Set New Budget</h2>
            <BudgetForm onSubmit={handleBudgetSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPage;