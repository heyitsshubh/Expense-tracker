import React, { useState, useContext, useEffect } from "react";
import "../../Styles/Transactions.css";
import { TransactionsContext } from "./TransactionContext"; 
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [sortType, setSortType] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const { refreshTransactions } = useContext(TransactionsContext); 

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("accessToken"); 
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      const response = await axios.get(
        "https://cash-cue-web.onrender.com/transaction/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "SUCCESS") {
        setTransactions(response.data.transactions); 
      } else {
        console.error("Failed to fetch transactions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error.response || error.message);
    }
  };
  const categorizeTransactions = (transactions) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    const grouped = {
      today: [],
      thisWeek: [],
      thisMonth: [],
      older: [],
    };
  
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0); 
  
      const diffTime = today - transactionDate; 
      const diffDays = diffTime / (1000 * 3600 * 24); 
  
      if (diffDays === 0) {
        grouped.today.push(transaction);
      } else if (diffDays > 0 && diffDays <= 7) {
        grouped.thisWeek.push(transaction);
      } else if (
        today.getFullYear() === transactionDate.getFullYear() &&
        today.getMonth() === transactionDate.getMonth()
      ) {
        grouped.thisMonth.push(transaction);
      } else {
        grouped.older.push(transaction);
      }
    });
  
    const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);
  
    grouped.today.sort(sortByDateDesc);
    grouped.thisWeek.sort(sortByDateDesc);
    grouped.thisMonth.sort(sortByDateDesc);
    grouped.older.sort(sortByDateDesc);
  
    return grouped;
  };

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
    </div>
  );
};

export default Transactions;
