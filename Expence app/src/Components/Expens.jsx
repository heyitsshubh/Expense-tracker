// import React, { useState } from "react";
// import "../Styles/Expens.css";

// const Expens = () => {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDatetime] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isExpense, setIsExpense] = useState(true); // Toggle between expense and income
//   const [successMessage, setSuccessMessage] = useState(false); // For showing success box

//   // Get the current date and time in the required format
//   const getCurrentDatetime = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, "0");
//     const day = String(now.getDate()).padStart(2, "0");
//     const hours = String(now.getHours()).padStart(2, "0");
//     const minutes = String(now.getMinutes()).padStart(2, "0");
//     return `${year}-${month}-${day}T${hours}:${minutes}`;
//   };

//   // Handle the form submission for adding an expense or income
//   const handleAddTransaction = () => {
//     // Show success box
//     setSuccessMessage(true);

//     // Clear the form
//     setAmount("");
//     setDescription("");
//     setDatetime("");

//     // Remove success message after 3 seconds
//     setTimeout(() => {
//       setSuccessMessage(false);
//     }, 3000);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div className="expense-page-container">
//       <div className="expense-form-container">
//         {/* Search Bar */}
//         <div className="search-bar-container">
//           <input
//             type="text"
//             placeholder="Search Transactions"
//             className="search-input"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </div>

//         {/* Toggle buttons for Expense/Income */}
//         <div className="toggle-buttons-container">
//           <button
//             className={isExpense ? "active-toggle" : ""}
//             onClick={() => setIsExpense(true)}
//           >
//             Expense
//           </button>
//           <button
//             className={!isExpense ? "active-toggle" : ""}
//             onClick={() => setIsExpense(false)}
//           >
//             Income
//           </button>
//         </div>

//         {/* Amount Display */}
//         <h2 className="amount-display">₹ {amount || "0"}</h2>

//         {/* Form */}
//         <form className="transaction-form">
//           <input
//             type="number"
//             placeholder="Enter amount"
//             className="amount-input"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             className="description-input"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//           <input
//             type="datetime-local"
//             id="datetime"
//             className="datetime-input"
//             value={date}
//             onChange={(e) => setDatetime(e.target.value)}
//             required
//             max={getCurrentDatetime()} // Prevent selecting future dates
//           />
//         </form>

//         {/* Button */}
//         <button
//           type="button"
//           className="add-transaction-btn"
//           onClick={handleAddTransaction}
//           required
//         >
//           {isExpense ? "Add New Expense" : "Add New Income"}
//         </button>

//         {/* Success Notification Box */}
//         {successMessage && (
//           <div className="success-notification-box">
//             <div className="success-icon">✔</div>
//             <p>{isExpense ? "Expense added successfully!" : "Income added successfully!"}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Expens;
















  
  
  
  
  
  
