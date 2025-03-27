import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTransactions } from "./Usetransaction";
import "../Styles/Dashboard.css";
import WeeklyGraph from "./WeeklyGraph";
import avtar from "../assets/avatar.png";
import balance from "../assets/balance.png";
import expense from "../assets/expense.png";
import WeeklyPieChart from './WeeklyPieChart'
import Income from "../assets/Income.png";
import DailyAnalysisChart from "./DailyAnalysischart";

const Dashboard = () => {
  const [name, setName] = useState(""); // Local state for user name
  const { transactions } = useTransactions();
  const [accountData, setAccountData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    remainingBalance: 0,
    averageDailyExpense: 0,
    averageWeeklyExpense: 0,
    averageMonthlyExpense: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("https://cash-cue-web.onrender.com/user/refresh-token", {
        token: refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (err) {
      console.error("Error refreshing token:", err);
      setError("Session expired. Please log in again.");
      setLoading(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  };

  const fetchUserDetails = async (authToken) => {
    try {
      console.log("Fetching user details with token:", authToken); // Log the token being used
      const response = await axios.get("https://cash-cue-web.onrender.com/homepage/name", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("User Details:", response.data);

      const { name } = response.data;

      if (name) {
        console.log("Fetched user name:", name);
        setName(name);
      } else {
        console.error("Name not found in response");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      }
      setError(err.response?.data?.message || err.message || "Failed to fetch user details.");
    }
  };

  const fetchAccountData = async (token) => {
    try {
      await fetchUserDetails(token); // Fetch user details

      const response = await axios.get("https://cash-cue-web.onrender.com/homepage/home", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        totalIncome = 0,
        totalExpense = 0,
        remainingBalance = 0,
        averageDailyExpense = "0",
        averageWeeklyExpense = "0",
        averageMonthlyExpense = "0",
      } = response.data.data || {};

      setAccountData({
        totalIncome,
        totalExpense,
        remainingBalance,
        averageDailyExpense: parseFloat(averageDailyExpense),
        averageWeeklyExpense: parseFloat(averageWeeklyExpense),
        averageMonthlyExpense: parseFloat(averageMonthlyExpense),
      });
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          fetchAccountData(newToken); 
        } else {
          setError("Unauthorized. Please log in again.");
          setLoading(false);
        }
      } else {
        setError(err.response?.data?.message || "Failed to fetch account data");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token);

    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    fetchAccountData(token);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <div className="search-bar">
          <input type="text" placeholder="Search here..." />
        </div>
        <div className="profile">
          <img src={avtar} alt="Profile" className="profile-img" />
          <span className="profile-name">{name || "User"}</span> 
        </div>
      </div>
      <div className="over"><h2>Overview</h2>
      </div>
      <div className="overview">
        <div className="card">
          <h1>Balance</h1>
          <p>₹{accountData.remainingBalance}</p>
          <img src={balance} alt="Balance" />
        </div>
        <div className="card">
          <h1>Income</h1>
          <p>₹{accountData.totalIncome}</p>
          <img src={Income} alt="Income" />
        </div>
        <div className="card">
          <h1>Expense</h1>
          <p>₹{accountData.totalExpense}</p>
          <img src={expense} alt="Expense" />
        </div>
        <div className="cards">
          <h1>Total Expense</h1>
  <WeeklyPieChart/>

</div>
      </div>

      <div className="analytics">
        <div className="chart1">
          <h3> Weekly Analysis</h3>
          <WeeklyGraph />
        </div>
        <div className="chart2">
          <h3>Daily Analysis</h3>
          <DailyAnalysisChart />
        </div>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <li key={transaction._id}>
                <span>{transaction.description}</span>
                <span
                  className={`transaction-amount ${
                    transaction.type === "Income" ? "income" : "expense"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}₹{transaction.amount}
                </span>
                <span>{new Date(transaction.date).toLocaleString()}</span>
              </li>
            ))
          ) : (
            <p>No recent transactions found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;


