import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    // Fetch financial data from API
    // This is a placeholder. Replace with actual API call.
    const fetchData = async () => {
      const response = await fetch('/api/financial-summary');
      const data = await response.json();
      setFinancialData(data);
    };

    fetchData();
  }, []);

  if (!financialData) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Income</h2>
          <p className="text-2xl text-green-600">${financialData.totalIncome}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
          <p className="text-2xl text-red-600">${financialData.totalExpenses}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Net Balance</h2>
          <p className="text-2xl text-blue-600">${financialData.netBalance}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financialData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expenses" fill="#F44336" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;