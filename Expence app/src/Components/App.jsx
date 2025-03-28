
// import '../Styles/App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import UserContext
import { UserContext } from "./Usercontext";

// Import components and pages
import LandingPage from "./LandingPage"; 
import LoginPage from "./Login";
import SignUp from "./Signup";
import Forgot1 from "./Forgot1";
import OtpPage from "./otp";
import OtpPage2 from "./otp2";
import ResetPassword from "./Resetpass";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "./Dashboard";
import ExpenseIncome from "../income/ExpenseIncome";
import Transactions from "./Transactions";
import { TransactionsProvider } from "./TransactionContext"; // Context for real-time updates
import UserProfile from "./UserProfile";
import Statistics from "./Statistics";
import Groups from "./Groups";
import CreateGroup from "./Creategroup";
import MakeGroup from "./Makegroup";
import Groupname from "./Groupname";

function App() {
  // State to manage the username
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ name, setUserName }}>
      <TransactionsProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot1 />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/otp2" element={<OtpPage2 />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} /> {/* Default dashboard route */}
              <Route path="income" element={<ExpenseIncome />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="groups" element={<Groups />} />
              <Route path="create-group" element={<CreateGroup />} />
              <Route path="addmembers" element={<MakeGroup />} />
              <Route path="groupname" element={<Groupname />} />
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
