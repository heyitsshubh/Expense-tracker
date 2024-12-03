import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Dashboard from "./Dashboard";
// import Transactions from "./Transactions";
// import IncomeExpense from "./Components/IncomeExpense";
// import Groups from "./Components/Groups";
// import Statistics from "./Components/Statistics";
// import UserProfile from "./Components/UserProfile";
// import "./DashboardLayout.css"; // Optional CSS

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main content area */}
      <div className="dashboard-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="income" element={<IncomeExpense />} />
          <Route path="groups" element={<Groups />} />
          <Route path="stats" element={<Statistics />} />
          <Route path="user" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
