import React, { useState } from 'react';
import '../Styles/User.css'
import avtar from '../assets/avatar.png'; 
import logout from '../assets/logout.png';// Import the image

const UserProfile = () => {
  const [isAccountBalanceExpanded, setIsAccountBalanceExpanded] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [addBalanceAmount, setAddBalanceAmount] = useState(0);

  const toggleAccountBalance = () => {
    setIsAccountBalanceExpanded(!isAccountBalanceExpanded);
  };

  const handleAddBalance = () => {
    setAccountBalance(accountBalance + addBalanceAmount);
    setAddBalanceAmount(0);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-left">
        <div className="user-profile-header">
          <div className="user-profile-photo">
            <img src={avtar} alt="" />
          </div>
          <div className="user-profile-info">
            <h2 className="user-profile-username">Ananya Singh</h2>
          </div>
        </div>
        <div className="user-profile-sections">
          <div
            className={`user-profile-section account-balance ${
              isAccountBalanceExpanded ? 'expanded' : ''
            }`}
            onClick={toggleAccountBalance}
          >
            <h3 className="user-profile-section-title">Account Balance</h3>
          </div>
          <div className="user-profile-section">
            <h3 className="user-profile-section-title">About</h3>
            {/* Render about section */}
          </div>
          <div className="user-profile-section">
            <h3 > logout</h3>
            <img src={logout} alt="" />
            {/* Render notifications */}
          </div>
        </div>
      </div>
      {isAccountBalanceExpanded && (
        <div className="user-profile-right">
          <h2 className="account-balance-title">Account Balance</h2>
          <div className="account-balance-content">
            <p>$: {accountBalance.toFixed(2)}</p>
            <div className="add-balance">
              <input
                type="number"
                value={addBalanceAmount}
                onChange={(e) => setAddBalanceAmount(parseFloat(e.target.value))}
                placeholder="Enter amount"
              />
              <button className="add-balance-button" onClick={handleAddBalance}>
                Add 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;