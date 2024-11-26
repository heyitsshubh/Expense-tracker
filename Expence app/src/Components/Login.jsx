import React, { useState } from 'react';
 import '../Styles/Login.css'
 import Calculator from '../assets/Calculator.png';
 import Money from '../assets/Money.png';
 import Chart from '../assets/Chart.png';
 import facebk from '../assets/facebk.png';
 import apple from '../assets/apple.png';
 import google from '../assets/google.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', email);
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-side">
        <div className="top-section">
          <div className="logo-container">
            <img src={Calculator} alt="Calculator Logo" className="calculator-icon" />
          </div>
          <div className="text-content">
            <h1>Sign in to</h1>
            <h2>Cash Cue</h2>
            <p className="register-text">
              If you don't have an account register <br />
              You can <span>Register here !</span>
            </p>
          </div>
        </div>

        <div className="bottom-section">
          <img src={Money} alt="Money Icon" className="money-icon" />
          <img src={Chart} alt="Chart" className="chart-icon" />
        </div>
      </div>

      {/* Right Section */}
      <div className="right-side">
        <div className="login-container">
          <h2>Sign in</h2>
          
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot-password">
                <span>Forgot password?</span>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="social-login">
            <p>or continue with</p>
            <div className="social-icons">
             <button className="social-btn">
                <img src={facebk} alt="Facebook" />
              </button>
              <button className="social-btn">
                <img src= {apple} alt="Apple" />
              </button>
              <button className="social-btn">
                <img src={google} alt="Google" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;