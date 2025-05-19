import React from "react";
import { NavLink } from "react-router-dom";
import '../Styles/Sidebar.css';
import homeIcon from'../assets/hme.png';
import walletIcon from '../assets/wallet.png';
import groupIcon from '../assets/group.png';
import graphIcon from '../assets/Graph.png';
import userIcon from '../assets/User.png';
import transaction from '../assets/transaction.png';
import logo from '../assets/logo.png'; 


function Sidebar() {
  const menuItems = [
    { path: "/dashboard", label: "Dashboard" , icon: homeIcon },
    { path: "/dashboard/income", label: "Expense/Income", icon: walletIcon},
    { path: "/dashboard/transactions", label: "Transactions" , icon: transaction },
    { path: "/dashboard/groups", label: "Groups" , icon: groupIcon},
    // { path: "/dashboard/stats", label: "Statistics", icon: graphIcon },
    { path: "/dashboard/user", label: "User", icon:userIcon },


  ];

  return (
      <aside className="sidebar">
        <div className="lg">
        <img src={logo} alt="Cash Cue Logo" className="logo" />
        <h2 className="sidebar-title">Cash Cue</h2>
        </div>
        <ul className="menu-items">
          {menuItems.map((item) => (
            <li key={item.path} className="menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
              <img src={item.icon} alt={item.label} style={{ width: 20, marginRight: 10 }} />
              {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    );
}

export default Sidebar;
