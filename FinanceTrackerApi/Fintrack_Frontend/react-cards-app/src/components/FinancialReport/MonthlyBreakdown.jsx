import React from 'react';

function MonthlyBreakdown({ monthlyData }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Monthly Breakdown</h3>
      <div className="mt-2">
        {monthlyData.map((month, index) => (
          <div key={index} className="bg-gray-200 p-3 rounded-lg mb-2">
            <h4>{month.month}</h4>
            <p>Income: {month.income}</p>
            <p>Expenses: {month.expenses}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyBreakdown;
