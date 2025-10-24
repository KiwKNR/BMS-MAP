import React from "react";
import "./styles/welcome.css";

function Welcome({ onEnter }) {
  return (
    <div className="welcome-body">
      <div className="welcome-container">
        <h1 className="title">
          Battlefield <br /> Management System
        </h1>
        <p className="subtitle">(BMS)</p>
        <button className="enter-btn" onClick={onEnter}>
          Enter the Battlefield
        </button>
      </div>
    </div>
  );
}

export default Welcome;
