import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recentexpense from './Recentexpense';
import Expense from './Expense';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);

  // Function to fetch expenses from the API
  const fetchExpenses = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get('https://cash-cue-web.onrender.com/expense/list', 
        {
          amount, // Ensure amount is sent as a number
          description,
          date,
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fetched expenses:', response.data.expenses);
      setExpenses(response.data.expenses || []); // Update the state with fetched expenses
    } catch (error) {
      console.error('Error fetching expenses:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when the component mounts
  }, []);

  // Function to handle adding a new expense
  const handleAddExpense = () => {
    fetchExpenses(); // Re-fetch expenses to update the list after adding a new one
  };

  return (
    <div className="expense-tracker">
      <Expense onAddExpense={handleAddExpense} />
      <Recentexpense expenses={expenses} />
    </div>
  );
}

export default ExpenseTracker;


