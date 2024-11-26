import React, { useState } from 'react';
import '../Styles/Signup.css'
import Calculator from '../assets/Calculator.png';
 import Money from '../assets/Money.png';
 import Chart from '../assets/Chart.png';
  import facebk from '../assets/facebk.png';
  import apple from '../assets/apple.png';
  import google from '../assets/google.png';
 
 function Signup() {
   // State to manage form inputs
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [contact, setContact] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   
   // State to toggle password visibility
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
   const handleSubmit = (e) => {
     e.preventDefault();
     if (password !== confirmPassword) {
       alert("Passwords do not match!");
       return;
     }
     alert("Form Submitted Successfully!");
     // You can now send this data to an API or perform further processing.
     console.log({ email, username, contact, password });
   };
 
   return (
     <div className="signup-container">
       <div className="signup-box">
         {/* Left section: Form */}
         <div className="form-section">
           <h2>Sign Up</h2>
           <form onSubmit={handleSubmit}>
             <input
               type="email"
               placeholder="Enter Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
             />
             <input
               type="text"
               placeholder="Create User name"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
             />
             <input
               type="text"
               placeholder="Contact number"
               value={contact}
               onChange={(e) => setContact(e.target.value)}
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
           <p>or continue with</p>
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
           </div>
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
 