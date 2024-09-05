import React from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

function ExpensesPage() {
  const handleExpenseSubmit = (expense) => {
    // Handle expense submission
    console.log('New expense:', expense);
    // You would typically send this to your API and then refresh the ExpenseList
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Expenses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ExpenseList />
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