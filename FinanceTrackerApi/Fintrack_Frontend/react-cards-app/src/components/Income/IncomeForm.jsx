import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function IncomeForm({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState(null);

  const formatDateToISO = (inputDate) => {
    const dateObj = new Date(inputDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = date ? formatDateToISO(date) : '';
    const newIncome = { amount, source, date: formattedDate };

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('https://finance-tracker-backend-8j8x.onrender.com/api/incomes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newIncome),
      });

      if (response.ok) {
        const data = await response.json();
        onSubmit(data);
        setAmount('');
        setSource('');
        setDate(null);
      } else {
        const errorData = await response.json();
        console.error('Error creating income', errorData);
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
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="amount-error"
        />
      </div>
      <div>
        <label htmlFor="source" className="block text-base font-medium text-gray-700 mb-1">Source</label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          placeholder="Enter source"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="source-error"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-base font-medium text-gray-700 mb-1">Date</label>
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
          className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm text-base focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200"
          aria-describedby="date-error"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
        aria-label="Add income"
      >
        Add Income
      </button>
    </form>
  );
}

export default IncomeForm;