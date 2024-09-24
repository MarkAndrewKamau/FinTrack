import React, { useState, useEffect } from 'react';
import './ReportPage.css';

function ReportPage() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch reports (GET request)
  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get JWT token from local storage
      const response = await fetch('http://127.0.0.1:8000/financial-report/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the request header
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch report data');
      }

      const data = await response.json();
      setReportData(data); // Assuming the API returns the array of reports
    } catch (error) {
      console.error('Error fetching report data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate and store a new report (POST request)
  const generateReport = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get JWT token from local storage
      const response = await fetch('http://127.0.0.1:8000/financial-report/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const newReport = await response.json();
      setReportData((prevReports) => [...prevReports, newReport]); // Add new report to existing list
    } catch (error) {
      console.error('Error generating report:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports Page</h1>

      {/* Error message display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Button to generate a new financial report */}
      <button 
        onClick={generateReport} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Generate New Report
      </button>

      {/* Display existing financial reports */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Financial Reports</h2>
        {reportData.length > 0 ? (
          reportData.map((report) => (
            <div key={report.id} className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold">{report.title}</h3>
              <p className="text-lg">{report.description}</p>
              {/* Remove download link */}
            </div>
          ))
        ) : (
          <p>No reports found. Generate a new report.</p>
        )}
      </div>
    </div>
  );
}

export default ReportPage;
