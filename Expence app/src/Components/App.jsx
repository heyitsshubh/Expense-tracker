
// import '../Styles/App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import UserContext
import { UserContext } from "./Usercontext";

// Import components and pages
import LoginPage from "./Login";
import SignUp from "./Signup";
import Forgot1 from "./Forgot1";
import OtpPage from "./otp";
import ResetPassword from "./Resetpass";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "./Dashboard";
import ExpenseIncome from "../income/ExpenseIncome";
import Transactions from "./Transactions";
import { TransactionsProvider } from "./TransactionContext"; // Context for real-time updates
import UserProfile from "./UserProfile";
import Statistics from "./Statistics";

function App() {
  // State to manage the username
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ name, setUserName }}>
      <TransactionsProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot1 />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} /> {/* Default dashboard route */}
              <Route path="income" element={<ExpenseIncome />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="stats" element={<Statistics />} />
              <Route path="user" element={<UserProfile />} />
            </Route>
          </Routes>
        </Router>
      </TransactionsProvider>
    </UserContext.Provider>
  );
}

export default App;
