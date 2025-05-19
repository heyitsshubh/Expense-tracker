import React, { useState } from 'react';
import '../Styles/Signup.css'
import { useNavigate } from 'react-router-dom';
import Calculator from '../assets/Calculator.png';
 import Money from '../assets/Money.png';
 import Chart from '../assets/Chart.png';
 import facebk from '../assets/facebk.png';
  import apple from '../assets/apple.png';
   import google from '../assets/google.png';
  import axios from 'axios';
 
 function Signup() {   
  const [email, setEmail] = useState("");
   const [name, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isSliding, setIsSliding] = useState(false); 
  const navigate = useNavigate();
 
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
  
        if (!passwordRegex.test(password)) {
          setErrorMessage(
            "Password must be 8 characters long and include at least one number and one symbol and one capital letter"
          );
          return;
        }
        
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    setLoading(true);
  
   try {
  const response = await axios.post(
    'https://cash-cue-web.onrender.com/user/signup',
    {
      name,
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  setSuccessMessage('Signup successful!');
  setErrorMessage('');
  console.log('Signup response:', response.data);

  localStorage.setItem('userEmail', email);
 
  setTimeout(() => navigate('/otp'), 1000); 
} catch (error) {
  console.error('Error during signup:', error.response?.data || error.message);
  setErrorMessage(
    error.response?.data?.message || 'An error occurred during signup. Please try again.'
  );
  setSuccessMessage('');
}
finally{
  setLoading(false);
}

  };
  const handleclick = () => {
    setIsSliding(true);
    setTimeout(() => navigate('/login'), 500);
  };
  

 
   return (
     <div className="signup-container">
         {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
       <div className="signup-box">
         <div className="form-section">
           <h2>Sign Up</h2>
           {errorMessage && <p className="error-message">{errorMessage}</p>}
           {successMessage && <p className="success-message">{successMessage}</p>}
           <form onSubmit={handleSubmit}>
           <input
               type="text"
               placeholder="Create User name"
               value={name}
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
           {/* <p>or continue with</p> */}
           <div className="social-icons">
           {/* <button className="social-button Facebook">
                <img src={facebk} alt="Facebook" />
              </button> */}
              {/* <button className="social-button Apple">
                <img src= {apple} alt="Apple" />
              </button> */}
              {/* <button className="social-button Google">
                <img src={google} alt="Google" />
              </button> */}
           </div>
         </div>

         <div className="info-section">
          <div className='content'>
           <h2>
             Sign Up to <br />
             <span>Cash Cue</span>
           </h2>
           <div className='content2'>
           <p style={{color:'black'}}>
             If you already have an account
             <br />
             You can <a href="#register" onClick={handleclick}>Sign In</a>!
           </p>
           </div>
           </div>
           <div className="images-container">
             <img src={Calculator} alt="Calculator" className='calc' />
             <img src={Money} alt="Money"  className='money'/>
             <img src={Chart} alt="Chart" className='char' />
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default Signup;
 