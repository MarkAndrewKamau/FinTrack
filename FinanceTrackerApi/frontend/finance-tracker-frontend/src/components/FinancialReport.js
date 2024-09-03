import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function FinancialReport() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    // Fetch financial report from API
    // This is a placeholder. Replace with actual API call.
    const fetchReport = async () => {
      const response = await fetch('/api/financial-report');
      const data = await response.json();
      setReport(data);
    };

    fetchReport();
  }, []);

  if (!report) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Financial Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Income</h3>
          <p className="text-2xl text-green-600">${report.totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-2xl text-red-600">${report.totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Net Balance</h3>
          <p className="text-2xl text-blue-600">${(report.totalIncome - report.totalExpenses).toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={report.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#4CAF50" />
            <Line type="monotone" dataKey="expenses" stroke="#F44336" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Budget Status</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Category</th>
              <th className="text-right">Budget</th>
              <th className="text-right">Actual</th>
              <th className="text-right">Difference</th>
            </tr>
          </thead>
          <tbody>
            {report.budgetStatus.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td>{item.category}</td>
                <td className="text-right">${item.budget.toFixed(2)}</td>
                <td className="text-right">${item.actual.toFixed(2)}</td>
                <td className={`text-right ${item.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(item.difference).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialReport;