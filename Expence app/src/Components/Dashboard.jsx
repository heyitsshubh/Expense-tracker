import React from "react";
import { useTransactions } from "./Usetransaction";
import "../Styles/Dashboard.css";
import AverageMoneySpentChart from "./Averagemoneychart"; 
import YearlyAnalysisChart from "./YearlyAnalysischart";
import avtar from "../assets/avatar.png";
import balance from "../assets/balance.png";
import expense from "../assets/expense.png";
import Income from "../assets/Income.png";

function Dashboard() {
  const { transactions } = useTransactions();

  // Get the 5 most recent transactions
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
          <span className="profile-name">Annanya Singh</span>
        </div>
      </div>
      <div className="overview">
        <div className="card">
          <h1>Balance</h1>
          <p>₹3456</p>
          <img src={balance} alt="" />
        </div>
        <div className="card">
          <h1>Income</h1>
          <p>₹2431</p>
          <img src={expense} alt="" />
        </div>
        <div className="card">
          <h1>Expense</h1>
          <p>₹1358</p>
          <img src={Income} alt="" />
        </div>
      </div>

      <div className="analytics">
        <div className="chart">
          <h3>Average Money Spent</h3>
          <p> ₹1000</p>
          <AverageMoneySpentChart />
        </div>
        <div className="chart">
          <h3>Yearly Analysis</h3>
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

