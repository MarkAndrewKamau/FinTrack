import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/expenses/', {
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
  };

  const handleExpenseSubmit = async (expense) => {
    // Make the API call to create the expense
    const response = await fetch('http://127.0.0.1:8000/api/expenses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Ensure you include your token
      },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      await fetchExpenses(); // Call the function to fetch expenses again
    } else {
      console.error('Failed to add expense:', await response.json());
    }
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
