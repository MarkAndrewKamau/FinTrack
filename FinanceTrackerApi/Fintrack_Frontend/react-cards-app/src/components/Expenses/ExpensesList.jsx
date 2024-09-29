import React, { useState } from 'react';

const ExpensesList = ({ expenses = [] }) => {  // Default to an empty array
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('');

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount') {
      return Number(b.amount) - Number(a.amount); // Ensure amount is a number
    }
    return 0;
  });

  const filteredExpenses = filterCategory
    ? sortedExpenses.filter(expense => expense.category === filterCategory)
    : sortedExpenses;

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <div>
          <label htmlFor='sort' className='mr-2'>Sort by:</label>
          <select
            id='sort'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          >
            <option value='date'>Date</option>
            <option value='amount'>Amount</option>
          </select>
        </div>
        <div>
          <label htmlFor='filter' className='mr-2'>Filter by category:</label>
          <select
            id='filter'
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className='rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          >
            <option value=''>All</option>
            <option value='food'>Food</option>
            <option value='transportation'>Transportation</option>
            <option value='utilities'>Utilities</option>
            <option value='entertainment'>Entertainment</option>
            <option value='other'>Other</option>
          </select>
        </div>
      </div>
      <ul className='space-y-4'>
        {filteredExpenses.map(expense => (
          <li key={expense.id} className='bg-white p-4 rounded shadow'>
            <div className='flex justify-between'>
              <span className='font-semibold'>{expense.description}</span>
              <span className='text-red-600'>
                ${Number(expense.amount).toFixed(2)} {/* Ensure amount is a number */}
              </span>
            </div>
            <div className='text-sm text-gray-500'>
              <span>{new Date(expense.date).toLocaleDateString()}</span>
              <span className='ml-4'>{expense.category}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesList;
