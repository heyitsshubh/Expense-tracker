import React, { useState } from 'react';
import '../Styles/Signup.css'
import Calculator from '../assets/Calculator.png';
 import Money from '../assets/Money.png';
 import Chart from '../assets/Chart.png';
  import facebk from '../assets/facebk.png';
  import apple from '../assets/apple.png';
  import google from '../assets/google.png';
  import axios from 'axios';
 
 function Signup() {
   // State to manage form inputs
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
  //  const [contact, setContact] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   
   // State to toggle password visibility
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State for error and success messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://cash-cue.onrender.com/user/signup', 
        {
          username,
          email,
          password,
        },
        
      );
  
      setSuccessMessage('Signup successful!');
      setErrorMessage('');
      console.log('Signup response:', response.data);
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during signup. Please try again.'
      );
      setSuccessMessage('');
    }
  };
  

 
   return (
     <div className="signup-container">
       <div className="signup-box">
         {/* Left section: Form */}
         <div className="form-section">
           <h2>Sign Up</h2>
           {errorMessage && <p className="error-message">{errorMessage}</p>}
           {successMessage && <p className="success-message">{successMessage}</p>}
           <form onSubmit={handleSubmit}>
           <input
               type="text"
               placeholder="Create User name"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
             />
        <input 
        type="email" 
        placeholder="Enter Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        />
   
             <div className="password-wrapper">
               <input
                 type={showPassword ? "text" : "password"}
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
               <button
                 type="button"
                 className="toggle-password"
                 onClick={() => setShowPassword(!showPassword)}
               >
                 {showPassword ? "🙈" : "👁️"}
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
             <button className="register-button" type="submit">
               Register
             </button>
           </form>
           {/* <p>or continue with</p>
           <div className="social-icons">
           <button className="social-button Facebook">
                <img src={facebk} alt="Facebook" />
              </button>
              <button className="social-button Apple">
                <img src= {apple} alt="Apple" />
              </button>
              <button className="social-button Google">
                <img src={google} alt="Google" />
              </button>
           </div> */}
         </div>
 
         {/* Right section: Info and Images */}
         <div className="info-section">
           <h2>
             Sign Up to <br />
             <span>Cash Cue</span>
           </h2>
           <p>
             If you already have an account
             <br />
             You can <a href="#register">Register here</a>!
           </p>
           <div className="images-container">
             <img src={Calculator} alt="Calculator" className='calc' />
             <img src={Money} alt="Money" />
             <img src={Chart} alt="Chart" />
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default Signup;
 