import React, { useState } from 'react';
import '../Styles/Login.css';
import Calculator from '../assets/Calculator.png';
import Money from '../assets/Money.png';
import Chart from '../assets/Chart.png';
import facebk from '../assets/facebk.png';
import apple from '../assets/apple.png';
import google from '../assets/google.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fadeClass, setFadeClass] = useState('');  
  const navigate = useNavigate(); 

  const handleForgotPassword = () => {
    navigate('/forgot'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cash-cue-web.onrender.com/user/signin', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      const token = response.data.token;
      const userGroups = response.data.data.groups;  // Get the groups from the response

      console.log("login token", token);

      if (token) {
        sessionStorage.setItem('authToken', token);  // Store token in sessionStorage
        console.log('Token saved to sessionStorage:', token);

        // Store the user's groups in sessionStorage
        sessionStorage.setItem('userGroups', JSON.stringify(userGroups));
        console.log('User groups saved to sessionStorage:', userGroups);
      }

      navigate('/dashboard');

    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Failed to log in.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const handleclick = () => {
    setFadeClass('fade-out');  
    navigate('/signup'); 
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('https://cash-cue.onrender.com/user/auth/google'); 
      window.location.href = response.data.googleAuthUrl;
    } catch (error) {
      console.error('Error initiating Google login:', error.response?.data || error.message);
      setErrorMessage('Failed to initiate Google login.');
    }
  };

  return (
    <div className={`login-page ${fadeClass}`}>

      <div className="left-side">
        <div className="top-section">
          <div className="logo-container">
            <img src={Calculator} alt="Calculator Logo" className="calculator-icon" />
          </div>
          <div className="text-content">
            <h1>Sign in to</h1>
            <h2>Cash Cue</h2>
            <span
                style={{ cursor:'pointer' ,color: '#b968e7' }} 
                onClick={handleclick}
              >
                Register here
              </span>!
            <p className="register-text">
              If you don't have an account  <br />
             </p>
          </div>
        </div>

        <div className="bottom-section">
          <img src={Money} alt="Money Icon" className="money-icon" />
          <img src={Chart} alt="Chart" className="chart-icon" />
        </div>
      </div>

      <div className="right-side">
        <div className="login-container">
          <h2>Sign in</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter email or user name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-field">
              <input
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot-password">
                <span onClick={handleForgotPassword} style={{ cursor: 'pointer', color: 'white' }}>Forgot password?</span>
              </div>
              <div className="password-emoji">
                <span 
                  onClick={togglePasswordVisibility} 
                  style={{ cursor: 'pointer', color: 'black' }}
                >
                     {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="social-login">
            {/* <p>or continue with</p> */}
            <div className="social-icons">
              {/* <button className="social-btn">
                <img src={facebk} alt="Facebook" />
              </button> */}
              {/* <button className="social-btn">
                <img src={apple} alt="Apple" />
              </button> */}
              {/* <button className="social-btn">
                <img src={google} alt="Google"  onClick={handleGoogleLogin}/>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

