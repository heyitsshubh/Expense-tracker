import React from "react";
import { Outlet } from "react-router-dom"; // For rendering nested routes
import Sidebar from "../Components/Sidebar"; // Adjust the import path if needed
import "../Styles/DashboardLayout.css"; // Add CSS for styling the layout

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet /> {/* Render child components here (e.g., Dashboard, Transactions, etc.) */}
      </div>
    </div>
  );
}

export default DashboardLayout;

