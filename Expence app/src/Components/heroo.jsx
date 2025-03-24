import React from "react";
import hero1 from "../assets/hero1.svg"; // Replace with the actual path to your image
import "../Styles/hero1.css"; // Import CSS file for styling

const Hero1 = () => {
  return (
    <div className="full-size-image-container">
      <img src={hero1} alt="Full Size" className="full-size-image" />
    </div>
  );
};

export default Hero1;