import React, { useState } from 'react';
import '../../Styles/OtpPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
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
        'https://cash-cue-web.onrender.com/user/verify-otp',
        { email, otp: otp.join('') }
      );
      console.log('OTP verification response:', response.data);

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        toast.success('OTP verified successfully.');
        setMessage('');
        setError('');

        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error('Tokens are missing in the response.');
        setError('');
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Error verifying OTP. Please try again.'
      );
      setMessage('');
      setError('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <ToastContainer />
      <div className="otp-card">
        <h1 className="otp-title">Verify OTP</h1>
        <p className="otp-subtitle">
          Please enter the OTP sent to your email address.
        </p>

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