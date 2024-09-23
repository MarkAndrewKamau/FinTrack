import React, { useState, useEffect, useCallback } from 'react';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';

function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBudgets = useCallback(async () => {
    const response = await fetch('http://127.0.0.1:8000/api/budgets/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setBudgets(data);
    }
  }, [token]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const handleBudgetSubmit = async (budgetData) => {
    const response = await fetch('http://127.0.0.1:8000/api/budgets/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budgetData),
    });

    if (response.ok) {
      await fetchBudgets();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Budgets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <BudgetList budgets={budgets} />
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

export default BudgetsPage;
