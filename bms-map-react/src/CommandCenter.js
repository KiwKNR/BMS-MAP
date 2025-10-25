import React from "react";
import "./styles/command.css";

export default function CommandCenter({ onLaunch, onBack }) {
  return (
    <div className="command-screen">
      {/* ส่วนหัว */}
      <header className="command-header">
        <h1 className="command-title">Command Center</h1>
        <p className="command-desc">System Status: Operational</p>
      </header>

      {/* ส่วนปุ่มควบคุม */}
      <div className="command-controls">
        <button className="command-btn back" onClick={onBack}>
          ◀ Back
        </button>
        <button className="command-btn launch" onClick={onLaunch}>
          ▶ Launch Mission
        </button>
      </div>
    </div>
  );
}
