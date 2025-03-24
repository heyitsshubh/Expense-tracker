import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/User.css";
import avtar from "../assets/avatar.png";
import logout from "../assets/logout.png";
import { UserContext } from "./Usercontext"; // Importing UserContext

const UserProfile = () => {
  const [isAccountBalanceExpanded, setIsAccountBalanceExpanded] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [addBalanceAmount, setAddBalanceAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const { setUserName } = useContext(UserContext); // Accessing UserContext

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (!storedToken) {
      setError("Authentication required. Please log in.");
    } else {
      setToken(storedToken);
      fetchUserDetails(storedToken); // Fetch both username and account balance
    }
  }, []);

  const fetchUserDetails = async (authToken) => {
    try {
      const response = await axios.get("https://cash-cue-web.onrender.com/homepage/name", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const { name, accountBalance } = response.data;

      if (name) setUserName(name); // Update username globally using context
      if (!isNaN(parseFloat(accountBalance))) {
        setAccountBalance(parseFloat(accountBalance));
      } else {
        throw new Error("Invalid account balance value received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch user details.");
    }
  };

  const toggleAccountBalance = () => {
    setIsAccountBalanceExpanded(!isAccountBalanceExpanded);
  };

  const handleAddBalance = async () => {
    if (addBalanceAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    if (!token) {
      setError("Token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "https://cash-cue-web.onrender.com/Settings/balance",
        { amount: parseFloat(addBalanceAmount) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAccountBalance(parseFloat(response.data.updatedBalance) || accountBalance);
        setAddBalanceAmount("");
      } else {
        throw new Error(response.data.message || "Unable to add balance.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-left">
        <div className="user-profile-header">
          <div className="user-profile-photo">
            <img src={avtar} alt="User Avatar" />
          </div>
          <div className="user-profile-info">
            {/* Username will now be fetched from context in other components */}
            <h2 className="user-profile-username">shubh</h2>
          </div>
        </div>
        <div className="user-profile-sections">
          <div
            className={`user-profile-section account-balance ${isAccountBalanceExpanded ? "expanded" : ""}`}
            onClick={toggleAccountBalance}
          >
            <h3 className="user-profile-section-title">Account Balance</h3>
          </div>
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
                onChange={(e) => setAddBalanceAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <button
                className="add-balance-button"
                onClick={handleAddBalance}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;



















