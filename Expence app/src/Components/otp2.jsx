import React, { useState } from 'react';
import '../Styles/OtpPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isInvalidOtp, setIsInvalidOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
  
    console.log('Email:', email);
  
    try {
      const response = await axios.post(
        'https://cash-cue-web.onrender.com/user/verify-otp1',
        { email, otp: otp.join('') }
      );
      console.log('OTP verification response:', response.data);
  
      if (response.data.status === 'SUCCESS') {
        // OTP verified successfully
        setMessage(response.data.message || 'OTP verified successfully.');
        setError('');
  
        // Redirect to reset password page after a short delay
        setTimeout(() => navigate('/reset-password'), 1000);
      } else {
        // Handle unexpected cases
        setError('Unexpected response from the server.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error verifying OTP. Please try again.'
      );
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h1 className="otp-title">Verify OTP</h1>
        <p className="otp-subtitle">
          Please enter the OTP sent to your email address.
        </p>

        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        <form onSubmit={handleOtpSubmit}>
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength="1"
                className="otp-input"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="verify-otp-button"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
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

export default OtpPage;