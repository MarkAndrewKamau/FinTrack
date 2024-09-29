import React, { useState } from 'react';

function IncomeList({ incomes = [] }) {  // Provide default empty array for incomes
  const [sortBy, setSortBy] = useState('date');
  const [filterSource, setFilterSource] = useState('');

  const sortedIncomes = [...incomes].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return 0;
  });

  const filteredIncomes = filterSource
    ? sortedIncomes.filter(income => income.source === filterSource)
    : sortedIncomes;

  // Get unique sources for filter dropdown
  const uniqueSources = [...new Set(incomes.map(income => income.source))];

  return (
    <div>
      {/* Sort and Filter options */}
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter" className="mr-2">Filter by source:</label>
          <select
            id="filter"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">All</option>
            {uniqueSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List of Incomes */}
      <ul className="space-y-4">
        {filteredIncomes.map(income => (
          <li key={income.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <span className="font-semibold">{income.source}</span>
              <span className="text-green-600">
              {typeof income.amount === 'number' ? `$${income.amount.toFixed(2)}` : `$${income.amount}`}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <span>{new Date(income.date).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeList;
