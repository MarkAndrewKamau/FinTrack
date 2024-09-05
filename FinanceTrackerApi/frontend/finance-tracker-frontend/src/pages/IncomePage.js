import React from 'react';
import IncomeList from '../components/IncomeList';
import IncomeForm from '../components/IncomeForm';

function IncomePage() {
  const handleIncomeSubmit = (income) => {
    // Handle income submission
    console.log('New income:', income);
    // You would typically send this to your API and then refresh the IncomeList
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Income</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <IncomeList />
        </div>
        <div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Income</h2>
            <IncomeForm onSubmit={handleIncomeSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomePage;