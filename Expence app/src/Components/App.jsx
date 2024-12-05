
// import '../Styles/App.css';
import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './Login';
import SignUp from './Signup';
import Forgot1 from './Forgot1';
import ResetPassword from './Resetpass';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from './Dashboard';
import ExpenseIncome from '../income/ExpenseIncome';
import Transactions from './Transactions';




function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot" element={<Forgot1 />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
       <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* Default child route */}
           <Route index element={<Dashboard />} />
           <Route path="income" element={<ExpenseIncome />} />
           <Route path="transactions" element={<Transactions />} />
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;

