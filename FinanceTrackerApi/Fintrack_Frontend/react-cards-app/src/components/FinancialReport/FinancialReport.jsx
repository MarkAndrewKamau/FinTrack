import React from 'react';
import FinancialMetrics from './FinancialMetrics';
import MonthlyBreakdown from './MonthlyBreakdown';
import FinancialChart from './FinancialChart'; // Import the chart

function FinancialReport() {
  const financialData = {
    savingsRate: '20%',
    debtToIncome: '30%',
    netWorthChange: '+$1,000',
    topExpense: 'Rent $1,200',
    investmentReturns: '+$500',
    goalProgress: '40% saved for vacation',
    monthlyBreakdown: [
      { month: 'August', income: '$4,500', expenses: '$3,200' },
      { month: 'September', income: '$5,000', expenses: '$3,500' },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Financial Report</h2>
      
      {/* Financial Metrics Section */}
      <FinancialMetrics financialData={financialData} />
      
      {/* Monthly Breakdown Section */}
      <MonthlyBreakdown monthlyData={financialData.monthlyBreakdown} />

      {/* Financial Chart Section */}
      <h3 className="text-xl font-bold mt-6 mb-4">Monthly Income vs Expenses</h3>
      <FinancialChart />  {/* Add the chart here */}
    </div>
  );
}

export default FinancialReport;
