import React, { useState, useContext } from "react";
import axios from "axios";
import "../Styles/Expense.css";
import { TransactionsContext } from "./TransactionContext";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDatetime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpense, setIsExpense] = useState(true); // Toggle between expense and income
  const [successMessage, setSuccessMessage] = useState(false); // For showing success box
  const { triggerRefresh } = useContext(TransactionsContext); // Use triggerRefresh from context

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
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      // API call to add a transaction (income or expense)
      const response = await axios.post(
        "https://cash-cue-web.onrender.com/transaction/add",
        {
          amount: parseFloat(amount), // Ensure amount is sent as a number
          description,
          date,
          type: isExpense ? "Expense" : "Income", // Distinguish between income and expense
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Transaction added successfully:", response.data);

      // Show success box
      setSuccessMessage(true);

      // Trigger refresh to update transactions
      triggerRefresh();

      // Clear the form
      setAmount("");
      setDescription("");
      setDatetime("");

      // Remove success message after 3 seconds
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
          <h2>How much ?</h2>
        <h2 >₹ {amount || "0"}</h2>
        </div>
<div className="form1">
        <form >
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
            max={getCurrentDatetime()} // Prevent selecting future dates
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
        </div>

        {/* Success Notification Box */}
        {successMessage && (
          <div className="success-box">
            <div className="success-icon">✔</div>
            <p>{isExpense ? "Expense added successfully!" : "Income added successfully!"}</p>
          </div>
        
        )}
    </div>
  );
};

export default Expense;












