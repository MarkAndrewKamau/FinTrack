import React from 'react';

function BudgetList({ budgets }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Budgets</h2>
      {budgets.length === 0 ? (
        <p>No budgets set yet.</p>
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id} className="mb-4">
              <div className="p-4 bg-white rounded shadow">
                <p><strong>Category:</strong> {budget.category}</p>
                <p><strong>Amount:</strong> ${budget.amount}</p>
                <p><strong>Start Date:</strong> {budget.start_date}</p>
                <p><strong>End Date:</strong> {budget.end_date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BudgetList;
