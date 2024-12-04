import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const YearlyAnalysisChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: [3000, 4000, 2800, 5000, 6200, 3200, 4000, 5300, 4700, 5400, 6200, 7000],
        borderColor: 'rgba(255, 66, 103, 0.5)',
        backgroundColor: 'rgba(255, 103, 103, 1)',
        fill: true,
      },
      {
        label: 'Expense',
        data: [2500, 3000, 2000, 4500, 4800, 2800, 3500, 4000, 3700, 4200, 4900, 5600],
        borderColor: 'rgba(185, 104, 231, 0.5)',
        backgroundColor: 'rgba(185, 104, 231, 1)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default YearlyAnalysisChart;

