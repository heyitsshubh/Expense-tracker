import React, { useState, useContext, useEffect } from "react";
import "../Styles/Transactions.css";
import { TransactionsContext } from "./TransactionContext"; // Custom context for real-time updates
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [sortType, setSortType] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const { refreshTransactions } = useContext(TransactionsContext); // Refresh trigger from context

  // Function to fetch transactions
  const fetchTransactions = async () => {
    try {
      const token = sessionStorage.getItem("authToken"); // Get the token from sessionStorage
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      // Make API call with token in Authorization header
      const response = await axios.get(
        "https://cash-cue-web.onrender.com/transaction/list",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
          },
        }
      );

      // Log the full response to check the structure
      console.log("Transactions fetched:", response.data);

      // Access the transactions array from the response
      if (response.data.status === "SUCCESS") {
        setTransactions(response.data.transactions); // Update state with the transactions array
      } else {
        console.error("Failed to fetch transactions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error.response || error.message);
    }
  };

  // Function to categorize transactions by date
  const categorizeTransactions = (transactions) => {
    const today = new Date();
    const grouped = {
      today: [],
      thisWeek: [],
      thisMonth: [],
      older: [],
    };

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const diffDays = Math.floor((today - transactionDate) / (1000 * 3600 * 24));
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = today.getMonth() - transactionDate.getMonth() + (12 * (today.getFullYear() - transactionDate.getFullYear()));

      if (filter === "daily" && diffDays <= 1) {
        grouped.today.push(transaction);
      } else if (filter === "weekly" && diffWeeks <= 1) {
        grouped.thisWeek.push(transaction);
      } else if (filter === "monthly" && diffMonths <= 1) {
        grouped.thisMonth.push(transaction);
      } else {
        grouped.older.push(transaction);
      }
    });

    // Sort transactions within each group by date (descending)
    grouped.today.sort((a, b) => new Date(b.date) - new Date(a.date));
    grouped.thisWeek.sort((a, b) => new Date(b.date) - new Date(a.date));
    grouped.thisMonth.sort((a, b) => new Date(b.date) - new Date(a.date));
    grouped.older.sort((a, b) => new Date(b.date) - new Date(a.date));

    return grouped;
  };

  // Fetch transactions on component mount and whenever `refreshTransactions` or `filter` changes
  useEffect(() => {
    fetchTransactions();
  }, [refreshTransactions, filter]);

  const groupedTransactions = categorizeTransactions(transactions);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleSortChange = (type) => {
    setSortType(type);
    setShowMenu(false);
  };

  const filteredTransactions = (group) => {
    if (sortType === "income") {
      return group.filter(transaction => transaction.type === "Income");
    } else if (sortType === "expense") {
      return group.filter(transaction => transaction.type === "Expense");
    }
    return group;
  };

  return (
    <div className="transactions-container">
      <div className="header">
        <h2>Transactions</h2>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        {showMenu && (
          <div className="hamburger-menu">
            <button onClick={() => handleSortChange("all")}>All</button>
            <button onClick={() => handleSortChange("income")}>Income</button>
            <button onClick={() => handleSortChange("expense")}>Expense</button>
          </div>
        )}
      </div>

      {/* Display Today's Transactions */}
      {groupedTransactions.today.length > 0 && (
        <div>
          <h3>Today</h3>
          <ul className="transactions-list">
            {filteredTransactions(groupedTransactions.today).map((transaction) => (
              <li key={transaction._id} className={`transaction-item ${transaction.type.toLowerCase()}`}>
                <div className="transaction-details">
                  <p className="transaction-description">{transaction.description}</p>
                  <p className="transaction-date">{new Date(transaction.date).toLocaleString()}</p>
                </div>
                <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                  {transaction.type === "Income" ? "+" : "-"}₹{transaction.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Weekly Transactions */}
      {groupedTransactions.thisWeek.length > 0 && (
        <div>
          <h3>This Week</h3>
          <ul className="transactions-list">
            {filteredTransactions(groupedTransactions.thisWeek).map((transaction) => (
              <li key={transaction._id} className={`transaction-item ${transaction.type.toLowerCase()}`}>
                <div className="transaction-details">
                  <p className="transaction-description">{transaction.description}</p>
                  <p className="transaction-date">{new Date(transaction.date).toLocaleString()}</p>
                </div>
                <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                  {transaction.type === "Income" ? "+" : "-"}₹{transaction.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Monthly Transactions */}
      {groupedTransactions.thisMonth.length > 0 && (
        <div>
          <h3>This Month</h3>
          <ul className="transactions-list">
            {filteredTransactions(groupedTransactions.thisMonth).map((transaction) => (
              <li key={transaction._id} className={`transaction-item ${transaction.type.toLowerCase()}`}>
                <div className="transaction-details">
                  <p className="transaction-description">{transaction.description}</p>
                  <p className="transaction-date">{new Date(transaction.date).toLocaleString()}</p>
                </div>
                <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                  {transaction.type === "Income" ? "+" : "-"}₹{transaction.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Older Transactions */}
      {groupedTransactions.older.length > 0 && (
        <div>
          <h3>Earlier</h3>
          <ul className="transactions-list">
            {filteredTransactions(groupedTransactions.older).map((transaction) => (
              <li key={transaction._id} className={`transaction-item ${transaction.type.toLowerCase()}`}>
                <div className="transaction-details">
                  <p className="transaction-description">{transaction.description}</p>
                  <p className="transaction-date">{new Date(transaction.date).toLocaleString()}</p>
                </div>
                <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                  {transaction.type === "Income" ? "+" : "-"}₹{transaction.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Message if no transactions are found */}
      {transactions.length === 0 && <p>No transactions found or invalid data format.</p>}
    </div>
  );
};

export default Transactions;
