import React from "react";
import { NavLink } from "react-router-dom";
// import "./Sidebar.css"; 

function Sidebar() {
  const menuItems = [
    { path: "/dashboard/dashboard", label: "Dashboard" },
    { path: "/dashboard/transactions", label: "Transactions" },
    { path: "/dashboard/income", label: "Expense/Income" },
    { path: "/dashboard/groups", label: "Groups" },
    { path: "/dashboard/stats", label: "Statistics" },
    { path: "/dashboard/user", label: "User" },
  ];

  return (
    <aside className="sidebar">
      <h2>Cash Cue</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
