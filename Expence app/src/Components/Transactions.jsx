import React from 'react';
import '../Styles/Transactions.css';

const Transactions = ({ transactions }) => {
    return (
        <div className="transactions">
            <h2>Recent Transactions</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} className="transaction">
                        <div><strong>Date:</strong> {transaction.date}</div>
                        <div><strong>Amount:</strong> {transaction.amount}</div>
                        <div><strong>Description:</strong> {transaction.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;

