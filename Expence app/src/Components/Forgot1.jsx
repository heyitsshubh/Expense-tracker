import React from 'react';
 import '../Styles/Forgot1.css';
 import { useNavigate } from 'react-router-dom';
 
 

 const Forgot1 = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleEmailSubmit = (e) => {
      e.preventDefault();
      console.log("Reset email sent!");
      // Here, you can add the functionality to send the reset email using an API.
    };
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h1 className="forgot-title">Forgot Password?</h1>
          <p className="forgot-subtitle">
            Don't worry! It occurs. Please enter the email address<br/> linked with your account.
          </p>
          <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
            required
          />
          <button type="submit" className="send-email-button">Send Email</button>
        </form>
        <p
          onClick={() => navigate('/')} // Navigate back to Login on click
          style={{ cursor: 'pointer', color: 'black', marginTop: '1rem' }}
        >
          Back to Login
        </p>

        </div>
       
      </div>
    );
  };
  
  export default Forgot1;
