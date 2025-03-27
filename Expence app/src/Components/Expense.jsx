import React, { useState, useContext } from "react";
import axios from "axios";
import "../Styles/Expense.css";
import { TransactionsContext } from "./TransactionContext";
import { useTransactions } from "./Usetransaction";

const Expense = () => {
  const { transactions } = useTransactions();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDatetime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpense, setIsExpense] = useState(true); 
  const [successMessage, setSuccessMessage] = useState(false); 
  const { triggerRefresh } = useContext(TransactionsContext); 

  const getCurrentDatetime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleAddTransaction = async () => {
   
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.post(
        "https://cash-cue-web.onrender.com/transaction/add",
        {
          amount: parseFloat(amount), 
          description,
          date,
          type: isExpense ? "Expense" : "Income", 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Transaction added successfully:", response.data);

      setSuccessMessage(true);

      triggerRefresh();

      setAmount("");
      setDescription("");
      setDatetime("");
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding transaction:", error.response || error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const recentTransactions = transactions
  .filter(transaction => transaction.type === "Expense") 
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return (
    <div className="expense-container">
      <div className="expense-income-form">
        <div className="toggle-buttons">
          <button
            className={isExpense ? "active" : ""}
            onClick={() => setIsExpense(true)}
          >
            Expense
          </button>
          <button
            className={!isExpense ? "active" : ""}
            onClick={() => setIsExpense(false)}
          >
            Income
          </button>
        </div>
        <div className="amount-display">
          <h2>How much?</h2>
        </div>
        <div className="amount">  <h2>₹ {amount || "0"}</h2></div>
        <div className="form1">
          <form>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              id="datetime"
              value={date}
              onChange={(e) => setDatetime(e.target.value)}
              required
              max={getCurrentDatetime()}
            />
          </form>
        </div>
        <button
          type="button"
          className="add-transaction-btn"
          onClick={handleAddTransaction}
          required
        >
          {isExpense ? "Add New Expense" : "Add New Income"}
        </button>
        {successMessage && (
          <div className="success-box">
            <div className="success-icon">✔</div>
            <p>{isExpense ? "Expense added successfully!" : "Income added successfully!"}</p>
          </div>
        )}
      </div>
      <div className="recent-transactions1">
        <h3>Recent Expenses</h3>
        <ul>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <li key={transaction._id}>
                <span>{transaction.description}</span>
                <span
                  className={`transaction-amount1 ${
                    transaction.type === "Income" ? "income" : "expense"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}₹{transaction.amount}
                </span>
                <span>{new Date(transaction.date).toLocaleString()}</span>
              </li>
            ))
          ) : (
            <p>No recent Expenses found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Expense;












