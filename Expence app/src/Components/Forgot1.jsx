import React, { useState } from 'react'; // Make sure useState is imported
 import '../Styles/Forgot1.css';
 import { useNavigate } from 'react-router-dom';
 import axios from 'axios';
 
 

 const Forgot1 = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [email, setEmail] = useState(''); // Track the email state
    const [message, setMessage] = useState(''); // For success or error messages
    const [error, setError] = useState(''); // For error messages
    const handleEmailSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Send the email to the backend API
        const response = await axios.post('https://cash-cue.onrender.com/user/Forgot-password', { email });
  
        // Handle success (show a success message)
        setMessage('If this email exists in our system, a reset link has been sent.');
        setError('');
      } catch (err) {
        // Handle errors
        setError('Error sending email. Please try again.');
        setMessage('');
      }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Bind email state to input
            required
          />
          <button type="submit" className="send-email-button">Send Email</button>
        </form>

        {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
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
