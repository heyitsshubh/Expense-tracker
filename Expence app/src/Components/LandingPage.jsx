import React from "react";
import HeroSection from "./hero";
import Hero1 from "./heroo"; // Assuming Hero1 is the component you want to display after HeroSection
import "../Styles/LandingPage.css"; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <Hero1 />
    </div>
  );
};

export default LandingPage;