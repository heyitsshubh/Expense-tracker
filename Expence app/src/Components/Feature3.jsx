import React from "react";
import featurepics from "../assets/Feature4.svg"; 


const Feature3 = () => {
  return (
         <div className="hero-content">
           <div className="text-section">
             <h1>Designed for <br /> Groups <br /> </h1>
             <p>Split expenses with friends or<br/> groups hassle-free.Whether<br/>it's trips, event or dinner <br/>bills-CashCue has you <br/> covered</p>
           </div>
           
           <div className="image-section">
             <img src={featurepics} alt="Hero Illustration" />
           </div>
         </div>
  );
};

export default Feature3;