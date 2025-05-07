// src/components/Loader.jsx
import React from "react";
import "./Loader.css"; // Optional: for spinner styling

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;