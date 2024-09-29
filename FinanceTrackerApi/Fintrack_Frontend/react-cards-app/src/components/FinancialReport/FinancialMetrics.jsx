// components/financialreport/FinancialMetrics.jsx
import React from 'react';

function FinancialMetrics({ financialData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Savings Rate */}
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Savings Rate</h3>
        <p>{financialData.savingsRate}</p>
      </div>

      {/* Debt to Income */}
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Debt to Income Ratio</h3>
        <p>{financialData.debtToIncome}</p>
      </div>

      {/* Net Worth Change */}
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Net Worth Change</h3>
        <p>{financialData.netWorthChange}</p>
      </div>

      {/* Top Expense */}
      <div className="bg-red-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Top Expense</h3>
        <p>{financialData.topExpense}</p>
      </div>

      {/* Investment Returns */}
      <div className="bg-purple-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Investment Returns</h3>
        <p>{financialData.investmentReturns}</p>
      </div>

      {/* Financial Goal */}
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Goal Progress</h3>
        <p>{financialData.goalProgress}</p>
      </div>
    </div>
  );
}

export default FinancialMetrics;
