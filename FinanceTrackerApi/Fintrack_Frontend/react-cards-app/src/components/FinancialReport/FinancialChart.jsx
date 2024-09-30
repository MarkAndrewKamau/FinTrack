import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FinancialChart = ({ monthlyBreakdown }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (monthlyBreakdown) {
      const labels = monthlyBreakdown.map((data) => data.month);
      const incomeData = monthlyBreakdown.map((data) => parseFloat(data.income.replace('$', '')));
      const expensesData = monthlyBreakdown.map((data) => parseFloat(data.expenses.replace('$', '')));

      setChartData({
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Expenses',
            data: expensesData,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [monthlyBreakdown]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Financial Report',
      },
    },
  };

  return (
    <div className="h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default FinancialChart;
