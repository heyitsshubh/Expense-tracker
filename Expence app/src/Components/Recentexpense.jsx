import React from 'react';
import '../Styles/Recentexpense.css'; // Ensure to link the specific CSS for recent expenses

function Recentexpense({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="recent-expenses">
        <h2>Recent Expenses</h2>
        <p>No recent expenses found.</p>
      </div>
    );
  }

  return (
    <div className="recent-expenses">
      <h2>Recent Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <div className="expense-details">
              <span className="description">{expense.description}</span>
              <span className="time">
                {new Date(expense.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <span className="amount">- ₹{expense.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recentexpense;

