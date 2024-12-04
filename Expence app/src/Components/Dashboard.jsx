import React from "react";
import '../Styles/Dashboard.css';// Create a CSS file for styling
import AverageMoneySpentChart from './Averagemoneychart'; 
import YearlyAnalysisChart from './YearlyAnalysischart'
import avtar from '../assets/avatar.png'; // Import the image

function Dashboard() {
  return (
    <div className="dashboard-container">
           <div className="top-bar">
        <div className="search-bar">
          <input type="text" placeholder="Search here..." />
        </div>
        <div className="profile">
          <img src={avtar} alt="Profile" className="profile-img" />
          <span className="profile-name">Annanya Singh</span>
        </div>
      </div>
      <div className="overview">
        <div className="card">
          <h3>Food</h3>
          <p>₹3456</p>
        </div>
        <div className="card">
          <h3>Transportation</h3>
          <p>₹2431</p>
        </div>
        <div className="card">
          <h3>Shopping</h3>
          <p>₹1358</p>
        </div>
        <div className="card">
          <h3>Subscription</h3>
          <p>₹2909</p>
        </div>
      </div>

      <div className="analytics">
        <div className="chart">
          <h3>Average Money Spent</h3>
          {/* Add a chart library or static chart */}
          <AverageMoneySpentChart/>
        </div>
        <div className="chart">
          <h3>Yearly Analysis</h3>
          {/* Add a chart library or static chart */}
          <YearlyAnalysisChart/>
        </div>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          <li>
            <span>Shopping</span> <span>- ₹120</span> <span>10:00 AM</span>
          </li>
          <li>
            <span>Subscription</span> <span>- ₹80</span> <span>03:30 PM</span>
          </li>
          <li>
            <span>Food</span> <span>- ₹32</span> <span>07:30 PM</span>
          </li>
          <li>
            <span>Salary</span> <span>+ ₹5000</span> <span>04:30 PM</span>
          </li>
          <li>
            <span>Transportation</span> <span>- ₹18</span> <span>08:30 PM</span>
          </li>
        </ul>
      </div>

      {/* <div className="activities">
        <div className="individual-activities">
          <h3>Individual Activities</h3>
          <ul>
            <li>Divya paid you ₹200 (Just now)</li>
            <li>Vivek received ₹987 (59 minutes ago)</li>
            <li>Sabih paid you ₹1000 (12 hours ago)</li>
          </ul>
        </div>
        <div className="group-activities">
          <h3>Group Activities</h3>
          <ul>
            <li>Ananya paid Vivek ₹809 (Just now)</li>
            <li>Divyansh recorded a payment (59 minutes ago)</li>
            <li>Sabih added "Bhajan" in "City Life" (12 hours ago)</li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
