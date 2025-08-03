import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DailyPieChart = () => {
  const [pieData, setPieData] = useState({
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [0, 0], // Placeholder
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
        hoverBackgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found. Please log in.");
        }

        const response = await axios.get(
          "https://cash-cue-web.onrender.com/transaction/graph1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rawData = response.data?.data || [];
        let totalExpenses = 0;
        let totalIncome = 0;

        // Process data
        rawData.forEach((transaction) => {
          if (transaction.type === "Expense") {
            totalExpenses += transaction.amount;
          } else if (transaction.type === "Income") {
            totalIncome += transaction.amount;
          }
        });

        setPieData({
          labels: [],
          datasets: [
            {
              data: [totalExpenses, totalIncome],
              backgroundColor: ["rgba(185, 104, 231, 1)", "rgba(229, 234, 252, 1)"],
              hoverBackgroundColor: ["rgba(185, 104, 231, 0.8)", "rgba(229, 234, 252, 0.8)"],
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pie chart data:", err.response || err.message);
        setError(err.response?.data?.message || err.message || "Failed to fetch pie chart data");
        setLoading(false);
      }
    };

    fetchPieChartData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: "80%", height: "80%" }}>
      <Pie data={pieData} />
    </div>
  );
};

export default DailyPieChart;
