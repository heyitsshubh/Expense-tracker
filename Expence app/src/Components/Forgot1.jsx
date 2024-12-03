import React, { useState } from 'react';
import '../Styles/Forgot1.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

  const Forgot1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(
        'https://cash-cue-web.onrender.com/user/Forgot-password',
        { email }
      );

      setMessage('If this email exists in our system, a reset link has been sent to your email.');
      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error sending email. Please try again.'
      );
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1 className="forgot-title">Forgot Password?</h1>
        <p className="forgot-subtitle">
          Don't worry! It happens. Please enter the email address<br /> linked with your account.
        </p>


        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="send-email-button"
            disabled={loading} 
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>

        <p
          onClick={() => navigate('/')}
          className="back-to-login"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default Forgot1;

