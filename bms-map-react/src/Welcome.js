import React from "react";
import "./styles/welcome.css";

export default function Welcome({ onEnter }) {
  return (
    <div className="welcome-screen">
      {/* โลโก้มุมบนซ้าย */}
      <header className="welcome-header">
        <h1 className="welcome-logo">BMS</h1>
        <span className="welcome-subtitle">
          Battlefield Management System
        </span>
      </header>

      {/* ปุ่มเข้าสู่ระบบ */}
      <main className="welcome-content">
        <button className="welcome-btn" onClick={onEnter}>
          Enter Command Center
        </button>
      </main>
    </div>
  );
}
