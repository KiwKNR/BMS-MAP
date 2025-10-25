import React from "react";
import "./styles/topbar.css";

export default function TopBar({ mapMode, onToggleMapMode }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">🛰️ BMS Tactical Console</span>
      </div>

      <div className="topbar-right">
        {/* Connection Status */}
        <div className="connection-status online">
          <div className="dot"></div>
          <span className="status-text">Online</span>
        </div>

        {/* Time Display */}
        <span className="clock">{new Date().toLocaleTimeString()}</span>

        {/* Dark/Light Mode Toggle */}
        <button className="mode-switch" onClick={onToggleMapMode}>
          {mapMode === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
}
