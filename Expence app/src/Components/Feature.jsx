import React from "react";
import featureimage from "../assets/Feature.svg"; 

const Feature = () => {
  return (
    <div className="full-size-image-container">
      <img src={featureimage} alt="Full Size" className="full-size-image" />
    </div>
  );
};

export default Feature;