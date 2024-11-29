
// import '../Styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import SignUp from './Signup';
import Forgot1 from './Forgot1';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for each component */}
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<LoginPage/>} />
        <Route path="/forgot" element={<Forgot1 />} />
      </Routes>
    </Router>
  );
}

export default App;

