import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const DailyAnalysisChart1 = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://cash-cue-web.onrender.com/transaction/graph1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rawData = response.data?.data || [];

        const timeLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        const expensesByHour = Array(24).fill(0);
        const incomeByHour = Array(24).fill(0);

        rawData.forEach((transaction) => {
          const hour = parseInt(transaction.time.split(":")[0], 10);
          if (transaction.type === "Expense") {
            expensesByHour[hour] += transaction.amount;
          } else if (transaction.type === "Income") {
            incomeByHour[hour] += transaction.amount;
          }
        });

        setChartData({
          labels: timeLabels,
          datasets: [
            {
              label: "Expenses",
              data: expensesByHour,
              backgroundColor: "rgba(185, 104, 231, 1)",
              borderColor: "rgba(185, 104, 231, 1)",
              borderWidth: 1,
            },
            {
              label: "Income",
              data: incomeByHour,
              backgroundColor: "rgba(229, 234, 252, 1)",
        borderColor: "rgba(229, 234, 252, 1)",
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching chart data:", err.response || err.message);
        setError(err.response?.data?.message || "Failed to fetch chart data");
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
        grid: {
          display: false, // Disable grid lines for y-axis
        },
      },
      x: {
        title: {
          display: true,
          text: "Time (Hours)",
        },
        grid: {
          display: false, // Disable grid lines for x-axis
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: "250px", width: "100%" }}>
      <h2>Daily Income and Expense Trends</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DailyAnalysisChart1;
