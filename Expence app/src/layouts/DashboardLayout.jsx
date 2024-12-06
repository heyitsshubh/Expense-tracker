import React from "react";
import { Outlet } from "react-router-dom"; 
import Sidebar from "../Components/Sidebar"; 
import "../Styles/DashboardLayout.css"; 

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet /> 
      </div>
    </div>
  );
}

export default DashboardLayout;

