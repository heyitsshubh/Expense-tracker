import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const WeeklyPieChart = () => {
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
          const totalIncome = data.reduce((acc, entry) => acc + (entry.totalIncome || 0), 0);
          const totalExpense = data.reduce((acc, entry) => acc + (entry.totalExpense || 0), 0);

          setWeeklyData({
            income: totalIncome,
            expense: totalExpense,
          });
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pie Chart Data
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [weeklyData.income, weeklyData.expense],
        backgroundColor: ["rgba(229, 234, 252, 1)", "rgba(185, 104, 231, 1)"],
        // hoverBackgroundColor: ["#4A8", "#C73A4F"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weekly Income vs Expense",
      },
    },
  };

  return (
    <div className="weekly-pie-chart-container" style={{ height:"100%", width:"100%"}}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default WeeklyPieChart;