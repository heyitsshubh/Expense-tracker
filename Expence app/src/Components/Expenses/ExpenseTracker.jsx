import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recentexpense from './Recentexpense';
import Expense from './Expense';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get('https://cash-cue-web.onrender.com/expense/list', 
        {
          amount, 
          description,
          date,
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fetched expenses:', response.data.expenses);
      setExpenses(response.data.expenses || []); 
    } catch (error) {
      console.error('Error fetching expenses:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchExpenses(); 
  }, []);

  const handleAddExpense = () => {
    fetchExpenses(); 
  };

  return (
    <div className="expense-tracker">
      <Expense onAddExpense={handleAddExpense} />
      <Recentexpense expenses={expenses} />
    </div>
  );
}

export default ExpenseTracker;


