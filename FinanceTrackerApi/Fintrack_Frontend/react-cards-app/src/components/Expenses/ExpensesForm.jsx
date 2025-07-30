import React, { useState } from 'react';

function ExpenseForm({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const expenseData = { amount: parseFloat(amount), description, date, category };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/expenses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        const newExpense = await response.json(); // Get the created expense from the response
        setAmount('');
        setDescription('');
        setDate('');
        setCategory('');
        onSubmit(newExpense); // Pass the new expense to update the parent state
      } else {
        console.error('Error creating expense:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="amount" className="block text-base font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Enter amount"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="amount-error"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Fixed to setDescription
          required
          placeholder="Enter description"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="description-error"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-base font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          placeholder="YYYY-MM-DD"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="date-error"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="category-error"
        >
          <option value="">Select a category</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
        aria-label="Add expense"
      >
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;