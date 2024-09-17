import React, { useState, useEffect } from 'react';
import './ReportPage.css';

function ReportPage() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch report data from API
    const fetchReportData = async () => {
      const response = await fetch('/api/financial-reports');
      const data = await response.json();
      setReportData(data);
    };

    fetchReportData();
  }, []);

  if (!reportData) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Financial Reports</h2>
        {reportData.reports.map((report, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h3 className="text-xl font-semibold">{report.title}</h3>
            <p className="text-lg">{report.description}</p>
            <a href={report.downloadLink} className="text-blue-500 underline">Download Report</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportPage;
