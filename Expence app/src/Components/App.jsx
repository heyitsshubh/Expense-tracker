import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./Usercontext";
import { GroupProvider } from "./GroupContext"; // Import GroupProvider
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
import { TransactionsProvider } from "./TransactionContext";
import UserProfile from "./UserProfile";
import Statistics from "./Statistics";
import Groups from "./Groups";
import CreateGroup from "./Creategroup";
// import Groupname from "./Groupname";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ name, setUserName }}>
      <TransactionsProvider>
        <GroupProvider> {/* Wrap the app with GroupProvider */}
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot" element={<Forgot1 />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/otp2" element={<OtpPage2 />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard/*" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<ExpenseIncome />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="groups" element={<Groups />} />
                <Route path="create-group" element={<CreateGroup />} />
                {/* <Route path="groupname" element={<Groupname />} /> */}
                <Route path="stats" element={<Statistics />} />
                <Route path="user" element={<UserProfile />} />
              </Route>
            </Routes>
          </Router>
        </GroupProvider>
      </TransactionsProvider>
    </UserContext.Provider>
  );
}

export default App;
