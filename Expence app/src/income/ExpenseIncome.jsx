// ExpenseIncome.jsx
// ExpenseIncomePage.jsx
import React from 'react';
import Expense from '../Components/Expense'; // Import the ExpenseIncomeForm component
import '../Styles/ExpenseIncome.css'; // Styles for the page layout

function ExpenseIncome() {
  return (
    <div className="expense-income-page">
      <div className="form">
        <Expense />
      </div>
    </div>
  );
}

export default ExpenseIncome;

