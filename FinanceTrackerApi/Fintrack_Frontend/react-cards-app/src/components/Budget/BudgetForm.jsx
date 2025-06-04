import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BudgetForm({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [limit, setLimit] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

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

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const budgetData = {
      amount: parseFloat(amount),
      limit: parseFloat(limit),
      category,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    onSubmit(budgetData);

    setAmount('');
    setLimit('');
    setCategory('');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      <div>
        <label htmlFor="amount" className="block text-base font-medium text-gray-700 mb-1">Budget Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Enter amount"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="amount-error"
        />
      </div>
      <div>
        <label htmlFor="limit" className="block text-base font-medium text-gray-700 mb-1">Budget Limit</label>
        <input
          type="number"
          id="limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
          placeholder="Enter limit"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="limit-error"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="category-error"
        >
          <option value="">Select a category</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Savings">Savings</option>
        </select>
      </div>
      <div>
        <label htmlFor="startDate" className="block text-base font-medium text-gray-700 mb-1">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          required
          placeholderText="Select start date"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="startDate-error"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-base font-medium text-gray-700 mb-1">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          required
          placeholderText="Select end date"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="endDate-error"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        aria-label="Set budget"
      >
        Set Budget
      </button>
    </form>
  );
}

export default BudgetForm;