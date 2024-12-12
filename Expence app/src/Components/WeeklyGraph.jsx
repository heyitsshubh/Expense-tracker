import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyGraph = () => {
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

        // Log the full response to check its structure
        console.log("API Response:", response.data);

        // Access the data array inside the response data object
        const data = response.data.data;

        if (Array.isArray(data)) {
          const income = [];
          const expense = [];
          const labels = [];

          // Loop through the data and process it
          data.forEach((entry) => {
            if (!entry.date) {
              console.error("Missing date field for entry:", entry);
              return; // Skip entries with missing date
            }

            income.push(entry.totalIncome);
            expense.push(entry.totalExpense);

            // Parse the date into a valid Date object
            const formattedDate = new Date(entry.date); // This will automatically parse the 'yyyy-mm-dd' format
            if (isNaN(formattedDate)) {
              console.error("Invalid Date format for", entry.date);
              return;
            }

            labels.push(formattedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }));
          });

          // Check if valid data exists
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

        // Log the error details for further analysis
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
        backgroundColor: "rgba(229, 234, 252, 1)",
        borderColor: "rgba(229, 234, 252, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: weeklyData.expense,
        backgroundColor: "rgba(185, 104, 231, 1)",
        borderColor: "rgba(185, 104, 231, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Disable grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Disable grid lines on the y-axis
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
    <div className="weekly-graph-container">
      {/* <h2>Weekly Income and Expense Graph</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyGraph;




















