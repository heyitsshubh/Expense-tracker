
// import '../Styles/App.css';
import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './Login';
import SignUp from './Signup';
import Forgot1 from './Forgot1';
import ResetPassword from './Resetpass';


function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot" element={<Forgot1 />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
 
      </Routes>
    </Router>
  );
}

export default App;

