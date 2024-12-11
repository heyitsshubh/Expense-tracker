import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const DailyAnalysisChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(
          "https://cash-cue-web.onrender.com/transaction/graph1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rawData = response.data?.data || [];

        // Generate hourly labels (0:00 to 23:00)
        const timeLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        const expensesByHour = Array(24).fill(0);
        const incomeByHour = Array(24).fill(0);

        // Process data
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
              label: "Hourly Expenses",
              data: expensesByHour,
              borderColor: "rgba(185, 104, 231, 1)",
              backgroundColor: "rgba(185, 104, 231, 1)",
              borderWidth: 2,
            },
            {
              label: "Hourly Income",
              data: incomeByHour,
              borderColor: "rgba(229, 234, 252, 1)",
              backgroundColor: "rgba(229, 234, 252, 1)",
              borderWidth: 2,
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
      },
      x: {
        title: {
          display: true,
          text: "Time (Hours)",
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
    <div style={{ height: "250px", width: "410px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DailyAnalysisChart;




// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   LinearScale,
//   Title,
//   CategoryScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";

// // Register Chart.js components
// ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

// const DailyAnalysisChart = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const token = sessionStorage.getItem("authToken");
//         const response = await axios.get(
//           "https://cash-cue-web.onrender.com/transaction/graph1",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const rawData = response.data?.data || [];

//         // Generate hourly labels (0:00 to 23:00)
//         const timeLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
//         const expensesByHour = Array(24).fill(0);
//         const incomeByHour = Array(24).fill(0);

//         // Process data
//         rawData.forEach((transaction) => {
//           const hour = parseInt(transaction.time.split(":")[0], 10);
//           if (transaction.type === "Expense") {
//             expensesByHour[hour] += transaction.amount;
//           } else if (transaction.type === "Income") {
//             incomeByHour[hour] += transaction.amount;
//           }
//         });

//         setChartData({
//           labels: timeLabels,
//           datasets: [
//             {
//               label: "Expenses",
//               data: expensesByHour,
//               backgroundColor: "rgba(255, 99, 132, 0.8)",
//               borderColor: "rgba(255, 99, 132, 1)",
//               borderWidth: 1,
//             },
//             {
//               label: "Income",
//               data: incomeByHour,
//               backgroundColor: "rgba(54, 162, 235, 0.8)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching chart data:", err.response || err.message);
//         setError(err.response?.data?.message || "Failed to fetch chart data");
//         setLoading(false);
//       }
//     };

//     fetchChartData();
//   }, []);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Amount (₹)",
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: "Time (Hours)",
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div style={{ height: "300px", width: "100%" }}>
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// export default DailyAnalysisChart;


