import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/Resetpass.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long and include at least one number and one symbol"
      );
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // console.log(token);
      // console.log(newPassword);
      
      
      const response = await axios.post(
        `http://cash-cue.onrender.com/user/reset-password/${token}`,
        {       
            newPassword,   
        },
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, 
        }
    );
      if (response.status === 200) {
        setMessage("Password has been reset successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.log("Error Response:", err);

      setError(err.response?.data?.message || "Failed to reset password. Please try again.");

      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="reset-password-container">
        <h1>Create New Password</h1>
        <p>Please enter and confirm your new password to complete the reset process.</p>

        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="password-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
