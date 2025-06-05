import React, { useState, useEffect, useCallback } from 'react';
import ExpenseList from '../components/Expenses/ExpensesList';
import ExpenseForm from '../components/Expenses/ExpensesForm';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  const fetchExpenses = useCallback(async () => {
    const response = await fetch('https://finance-tracker-backend-8j8x.onrender.com/api/expenses/', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      setExpenses(data);
    } else {
      console.error('Failed to fetch expenses:', await response.json());
    }
  }, [token]); // Include token as a dependency

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]); // Include fetchExpenses in the dependency array

  const handleExpenseSubmit = () => {
    fetchExpenses(); // Fetch expenses again after a new expense is submitted
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Expenses</h1>
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