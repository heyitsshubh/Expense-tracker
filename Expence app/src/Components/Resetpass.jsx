import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Styles/Resetpass.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // For success messages
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();
  const location = useLocation(); // To get the token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Extract token from the URL path
    const resettoken = location.pathname.split("/reset-password/")[1];

    if (!resettoken) {
      setError("Invalid or missing reset token. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual reset password API endpoint
      const response = await axios.post("https://cash-cue.onrender.com/user/reset-password/:token", {
        password,
        resettoken, // Send token for backend verification
      });

      if (response.status === 200) {
        setMessage("Password has been reset successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect to login page
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
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
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
