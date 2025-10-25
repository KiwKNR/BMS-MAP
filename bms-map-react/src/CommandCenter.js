import React from "react";
import "./styles/command.css";

function CommandCenter({ onEnterMap }) {
  return (
    <div className="command-container">
      <h1 className="command-title">COMMAND CENTER</h1>

      <div className="mission-brief">
        <h2>Mission Briefing</h2>
        <p>Operation Falcon — Secure perimeter around sector Bravo.</p>
        <p>Weather: Clear | Visibility: 98% | Time: 0600 hrs</p>
      </div>

      <div className="systems-grid">
        <button>🎯 Target Tracking</button>
        <button>🛰️ UAV Recon</button>
        <button>💥 Artillery Range</button>
        <button>🧭 Terrain Analysis</button>
        <button>⚙️ Logistics Route</button>
      </div>

      <button className="enter-map" onClick={onEnterMap}>
        ▶ Launch Mission
      </button>
    </div>
  );
}

export default CommandCenter;
