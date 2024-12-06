import React, { useState, useContext, useEffect } from "react";
import "../Styles/Transactions.css";
import { TransactionsContext } from "./TransactionContext"; // Custom context for real-time updates
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
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
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const grouped = {
      today: [],
      yesterday: [],
      older: [],
    };

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      
      // Check if transaction is today, yesterday, or older
      if (isSameDay(transactionDate, today)) {
        grouped.today.push(transaction);
      } else if (isSameDay(transactionDate, yesterday)) {
        grouped.yesterday.push(transaction);
      } else {
        grouped.older.push(transaction);
      }
    });

    // Sort transactions within each group by date (descending)
    grouped.today.sort((a, b) => new Date(b.date) - new Date(a.date));
    grouped.yesterday.sort((a, b) => new Date(b.date) - new Date(a.date));
    grouped.older.sort((a, b) => new Date(b.date) - new Date(a.date));

    return grouped;
  };

  // Helper function to compare if two dates are the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Fetch transactions on component mount and whenever `refreshTransactions` changes
  useEffect(() => {
    fetchTransactions();
  }, [refreshTransactions]);

  const groupedTransactions = categorizeTransactions(transactions);

  return (
    <div className="transactions-container">
      <h2> Transactions</h2>

      {/* Display Today's Transactions */}
      {groupedTransactions.today.length > 0 && (
        <div>
          <h3>Today</h3>
          <ul className="transactions-list">
            {groupedTransactions.today.map((transaction) => (
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

      {/* Display Yesterday's Transactions */}
      {groupedTransactions.yesterday.length > 0 && (
        <div>
          <h3>Yesterday</h3>
          <ul className="transactions-list">
            {groupedTransactions.yesterday.map((transaction) => (
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
            {groupedTransactions.older.map((transaction) => (
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


