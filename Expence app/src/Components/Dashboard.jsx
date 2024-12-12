import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTransactions } from "./Usetransaction";
import "../Styles/Dashboard.css";
import WeeklyGraph from "./WeeklyGraph"; 
import YearlyAnalysisChart from "./YearlyAnalysischart";
import avtar from "../assets/avatar.png";
import balance from "../assets/balance.png";
import expense from "../assets/expense.png";
import Income from "../assets/Income.png";

const Dashboard = () => {
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
  // const location = useLocation()
//   console.log("location", location);
//  console.log("lstate", location.state);
  
  const token = sessionStorage.getItem("authToken");

  console.log("Token retrieved from sessionStorage:", token);
  

  useEffect(() => {
    const fetchAccountData = async () => {
       const token = sessionStorage.getItem("authToken");
      console.log(token);
      

      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://cash-cue.onrender.com/homepage/home", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const {
          "totalIncome": totalIncome = 0,
          "totalExpense": totalExpense = 0,
          remainingBalance = 0,
          averageDailyExpense = "0",
          "averageWeeklyExpense": averageWeeklyExpense = "0",
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
        setError(
          err.response?.status === 401
            ? "Unauthorized. Please log in again."
            : err.response?.data?.message || "Failed to fetch account data"
        );
        setLoading(false);
      }
    };

    fetchAccountData();
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
          <span className="profile-name">Shubh</span>
        </div>
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
      </div>

      <div className="analytics">
        <div className="chart">
          <h3> Weekly Analysis</h3>
          <ul>
            {/* <li>Daily: ₹{accountData.averageDailyExpense}</li> */}
            {/* <li> ₹{accountData.averageWeeklyExpense}</li> */}
            {/* <li>Monthly: ₹{accountData.averageMonthlyExpense}</li> */}
          </ul>
          <WeeklyGraph />
        </div>
        <div className="chart">
          <h3>Daily Analysis</h3>
          <YearlyAnalysisChart />
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
}

export default Dashboard;

