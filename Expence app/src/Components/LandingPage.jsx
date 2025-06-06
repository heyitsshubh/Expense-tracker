import React from "react";
import HeroSection from "./hero";
import Hero1 from "./heroo"; // Assuming Hero1 is the component you want to display after HeroSection
import Feature from "./Feature";
import Feature2 from "./Feature2";
import Feature3 from "./Feature3";
// import "../Styles/LandingPage.css"; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <Hero1 />
      <Feature />
      <Feature2 />
     <Feature3 />
    </div>
  );
};

export default LandingPage;