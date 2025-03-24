import React from "react";
import "../Styles/Hero.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.svg";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/login");
  }
  const handlesearchclick = () => {
    navigate("/signup");
  }
  return (
    <div className="hero-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🔄 Cash Cue</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Features</li>
          <li>About us</li>
          <li>App</li>
        </ul>
        <div className="buttons">
          <button onClick={handleclick}className="sign-in">Sign In</button>
          <button onClick={handlesearchclick}className="create-account">Create an account</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="hero-content">
        {/* Text Section */}
        <div className="text-section">
          <h1>Manage your <br /> Expenses to <br /> Save Money</h1>
          <p>Helps you to organize your income and expenses</p>
        </div>
        
        {/* Image Section */}
        <div className="image-section">
          <img src={heroImage} alt="Hero Illustration" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
