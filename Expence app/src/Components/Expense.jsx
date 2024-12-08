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

  const { triggerRefresh } = useContext(TransactionsContext); // Use triggerRefresh from context

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
          amount, // Ensure amount is sent as a number
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

      // Trigger refresh to update transactions
      triggerRefresh(); // This should trigger the refresh mechanism
      console.log("Triggering refresh...");

      // Clear the form
      setAmount("");
      setDescription("");
      setDatetime("");
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
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Toggle buttons for Expense/Income */}
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

      {/* Amount Display */}
      <h2 className="amount-display">₹ {amount || "0"}</h2>

      {/* Form */}
      <form className="form">
        <input
          type="number"
          placeholder="Enter amount"
          className="amount-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          id="datetime"
          className="datetime-input"
          value={date}
          onChange={(e) => setDatetime(e.target.value)}
        />
      </form>

      {/* Button */}
      <button
        type="button"
        className="add-transaction-btn"
        onClick={handleAddTransaction}
      >
        {isExpense ? "Add New Expense" : "Add New Income"}
      </button>
    </div>
    </div>
  );
};

export default Expense;







