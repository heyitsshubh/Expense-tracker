import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/User.css";
import avtar from "../assets/avatar.png";
import logout from "../assets/logout.png";

const UserProfile = () => {
  const [isAccountBalanceExpanded, setIsAccountBalanceExpanded] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0); // Start with 0
  const [addBalanceAmount, setAddBalanceAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [name, setUsername] = useState("User"); // Default to "User"

  const navigate = useNavigate(); // React Router's navigate function

  // Fetch username and account balance when the component mounts
  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");

    if (!storedToken) {
      setError("Authentication required. Please log in.");
    } else {
      setToken(storedToken);
      fetchUserDetails(storedToken); // Fetch both username and account balance
    }
  }, []);

  // Function to fetch user details
  const fetchUserDetails = async (authToken) => {
    try {
      const response = await axios.get("https://cash-cue-web.onrender.com/homepage/name", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const { name, accountBalance } = response.data;

      if (name) setUsername(name); // Update username
      if (!isNaN(parseFloat(accountBalance))) {
        setAccountBalance(parseFloat(accountBalance)); // Update balance
      } else {
        throw new Error("Invalid account balance value received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch user details.");
    }
  };

  // Toggle account balance section
  const toggleAccountBalance = () => {
    setIsAccountBalanceExpanded(!isAccountBalanceExpanded);
  };

  // Handle adding balance
  const handleAddBalance = async () => {
    if (addBalanceAmount > 0 && token) {
      setLoading(true);
      setError(null);

      // Ensure the amount is a valid number
      const sanitizedAmount = parseFloat(addBalanceAmount);

      if (isNaN(sanitizedAmount)) {
        setError("Invalid amount format.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.put(
          "https://cash-cue-web.onrender.com/Settings/balance",
          { amount: sanitizedAmount }, // Send amount as a valid number
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const updatedBalance = parseFloat(response.data.updatedBalance); // Convert to number
          if (!isNaN(updatedBalance)) {
            setAccountBalance(updatedBalance); // Update balance
            setAddBalanceAmount(0); // Clear input field
          } else {
            throw new Error("Invalid updated balance received from the server.");
          }
        } else {
          throw new Error(response.data.message || "Unable to add balance.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    } else if (!token) {
      setError("Token is missing. Please log in again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/"); // Navigate to login page
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-left">
        <div className="user-profile-header">
          <div className="user-profile-photo">
            <img src={avtar} alt="User Avatar" />
          </div>
          <div className="user-profile-info">
            <h2 className="user-profile-username">{name}</h2> {/* Display the username */}
          </div>
        </div>
        <div className="user-profile-sections">
          <div
            className={`user-profile-section account-balance ${isAccountBalanceExpanded ? "expanded" : ""}`}
            onClick={toggleAccountBalance}
          >
            <h3 className="user-profile-section-title">Account Balance</h3>
          </div>
          {/* <div className="user-profile-section">
             <h3 className="user-profile-section-title">About</h3> 
          </div> */}
          <div className="user-profile-section" onClick={handleLogout}>
            <h3>Logout</h3>
            <img src={logout} alt="Logout Icon" />
          </div>
        </div>
      </div>
      {isAccountBalanceExpanded && (
        <div className="user-profile-right">
          <h2 className="account-balance-title">Account Balance</h2>
          <div className="account-balance-content">
            <p>Balance: ₹{accountBalance.toFixed(2)}</p>
            <div className="add-balance">
              <input
                type="number"
                value={addBalanceAmount}
                onChange={(e) => setAddBalanceAmount(parseFloat(e.target.value) || 0)}
                placeholder="Enter amount"
              />
              <button
                className="add-balance-button"
                onClick={handleAddBalance}
                disabled={loading} // Disable button during loading
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Display errors */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;


















