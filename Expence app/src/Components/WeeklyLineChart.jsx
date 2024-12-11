import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeeklyLineChart = () => {
  const [weeklyData, setWeeklyData] = useState({ income: [], expense: [], labels: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchWeeklyGraphData = async () => {
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://cash-cue-web.onrender.com/transaction/graph2", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);

        const data = response.data.data;

        if (Array.isArray(data)) {
          const income = [];
          const expense = [];
          const labels = [];

          data.forEach((entry) => {
            if (!entry.date) {
              console.error("Missing date field for entry:", entry);
              return;
            }

            income.push(entry.totalIncome);
            expense.push(entry.totalExpense);

            const formattedDate = new Date(entry.date);
            if (isNaN(formattedDate)) {
              console.error("Invalid Date format for", entry.date);
              return;
            }

            labels.push(
              formattedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            );
          });

          if (income.length === 0 || expense.length === 0 || labels.length === 0) {
            setError("No valid data available for this week.");
          } else {
            setWeeklyData({
              income,
              expense,
              labels,
            });
          }
        } else {
          setError("Invalid data format received from API.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response) {
          setError(`API Error: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`);
        } else if (err.request) {
          setError("No response from server.");
        } else {
          setError(`Error: ${err.message}`);
        }
        setLoading(false);
      }
    };

    fetchWeeklyGraphData();
  }, [token]);

  const data = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: "Income",
        data: weeklyData.income,
        borderColor: "rgba(229, 234, 252, 1)",
        backgroundColor: "rgba(229, 234, 252, 0.5)",
        fill: true,
        tension: 0.3, // Add curve to the line
        pointBorderColor: "rgba(229, 234, 252, 1)",
        pointBackgroundColor: "rgba(229, 234, 252, 1)",
      },
      {
        label: "Expense",
        data: weeklyData.expense,
        borderColor: "rgba(185, 104, 231, 1)",
        backgroundColor: "rgba(185, 104, 231, 0.5)",
        fill: true,
        tension: 0.3, // Add curve to the line
        pointBorderColor: "rgba(185, 104, 231, 1)",
        pointBackgroundColor: "rgba(185, 104, 231, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Income and Expense Trends",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
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
    <div className="weekly-graph-container" style={{height: "250px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeeklyLineChart;
