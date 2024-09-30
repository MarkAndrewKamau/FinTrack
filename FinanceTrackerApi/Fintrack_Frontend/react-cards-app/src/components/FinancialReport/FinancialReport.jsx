import React, { useState } from 'react';
import FinancialMetrics from './FinancialMetrics';
import MonthlyBreakdown from './MonthlyBreakdown';
import FinancialChart from './FinancialChart'; // Import the chart

function FinancialReport() {
  // Initial state for financial data
  const [financialData, setFinancialData] = useState(null);

  // Function to generate the report
  const generateReport = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/financial-report/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setFinancialData(data);  // Set the state with real data
      } else {
        console.error('Failed to generate report:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Financial Report</h2>

      {/* Button to generate the report */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={generateReport}
      >
        Generate Report
      </button>

      {/* Conditional rendering: Only show metrics and breakdown if data is available */}
      {financialData ? (
        <>
          {/* Financial Metrics Section */}
          <FinancialMetrics financialData={financialData} />
          
          {/* Monthly Breakdown Section */}
          <MonthlyBreakdown monthlyData={financialData.monthlyBreakdown} />

          {/* Financial Chart Section */}
          <h3 className="text-xl font-bold mt-6 mb-4">Monthly Income vs Expenses</h3>
          <FinancialChart />  {/* Add the chart here */}
        </>
      ) : (
        <p>No report generated yet. Click "Generate Report" to see your financial data.</p>
      )}
    </div>
  );
}

export default FinancialReport;
