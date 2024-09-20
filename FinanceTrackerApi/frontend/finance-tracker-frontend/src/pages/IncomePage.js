import React, { useState, useEffect } from 'react';
import IncomeList from '../components/IncomeList';
import IncomeForm from '../components/IncomeForm';

function IncomePage() {
  const [incomes, setIncomes] = useState([]);

  // Fetch incomes from API
  const fetchIncomes = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/api/incomes/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setIncomes(data);
  };

  useEffect(() => {
    fetchIncomes(); // Fetch incomes on page load
  }, []);

  const handleIncomeSubmit = (newIncome) => {
    // Add new income to the list
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Income</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <IncomeList incomes={incomes} />
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
