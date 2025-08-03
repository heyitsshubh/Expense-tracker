import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./Usercontext";
// import { GroupProvider } from "./GroupContext"; 
import LoginPage from "./Auth/Login";
import SignUp from "./Auth/Signup";
import Forgot1 from "./Auth/Forgot1";
import OtpPage from "./Auth/otp";
import OtpPage2 from "./Auth/otp2";
import ResetPassword from "./Auth/Resetpass";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "./Dashboard";
import ExpenseIncome from "../income/ExpenseIncome";
import Transactions from "./Transactions/Transactions";
import { TransactionsProvider } from "./Transactions/TransactionContext";
import UserProfile from "./UserProfile";
// import Groups from "./Groups";
// import CreateGroup from "./Creategroup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Groupname from "./Groupname";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ name, setUserName }}>
      <TransactionsProvider>
        {/* <GroupProvider> */}
          <Router>
             <ToastContainer />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot" element={<Forgot1 />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/otp2" element={<OtpPage2 />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard/*" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<ExpenseIncome />} />
                <Route path="transactions" element={<Transactions />} />
                {/* <Route path="groups" element={<Groups />} />
                <Route path="create-group" element={<CreateGroup />} /> */}
                {/* <Route path="groupname" element={<Groupname />} /> */}
                <Route path="user" element={<UserProfile />} />
              </Route>
            </Routes>
          </Router>
        {/* </GroupProvider> */}
      </TransactionsProvider>
    </UserContext.Provider>
  );
}

export default App;
