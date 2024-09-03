import React from 'react';
import FinancialReport from '../components/FinancialReport';

function ReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Financial Report</h1>
      <FinancialReport />
    </div>
  );
}

export default ReportPage;