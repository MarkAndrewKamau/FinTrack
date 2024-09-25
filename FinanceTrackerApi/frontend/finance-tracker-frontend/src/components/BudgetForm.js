import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function BudgetForm({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [limit, setLimit] = useState(''); // Added limit state
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!amount || !limit || !category || !startDate || !endDate) {
      setError('All fields are required.');
      return;
    }

    if (parseFloat(amount) <= 0 || parseFloat(limit) <= 0) {
      setError('Amount and limit must be greater than zero.');
      return;
    }

    if (startDate >= endDate) {
      setError('End date should be after start date.');
      return;
    }

    // Ensure dates are in YYYY-MM-DD format
    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';

    const budgetData = { 
      amount: parseFloat(amount), // Ensure it's a number
      limit: parseFloat(limit), // Ensure limit is a number
      category, 
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    onSubmit(budgetData); // Pass the formatted data to the parent component

    // Reset form fields
    setAmount('');
    setLimit('');
    setCategory('');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Budget Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="limit" className="block text-sm font-medium text-gray-700">Budget Limit</label> {/* Added limit label */}
        <input
          type="number"
          id="limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Savings">Savings</option>
        </select>
      </div>
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Set Budget
      </button>
    </form>
  );
}

export default BudgetForm;
