import React, { useState } from "react";
import "./styles/sidebar.css";

export default function MapSidebar() {
  const [mission, setMission] = useState(
    localStorage.getItem("bms_current_mission") || "Mission 1"
  );
  const missions = ["Mission 1", "Mission 2", "Mission 3"];
  const commanderName = "Kiw"; // 🟢 เปลี่ยนชื่อผู้ใช้ตรงนี้ได้

  const saveMission = () => {
    localStorage.setItem(`bms_${mission}`, localStorage.getItem("bms_units") || "[]");
    localStorage.setItem("bms_current_mission", mission);
    if (window.BMSLog) window.BMSLog(`Saved ${mission}`, "info");
  };

  const loadMission = () => {
    const saved = localStorage.getItem(`bms_${mission}`);
    if (saved) {
      localStorage.setItem("bms_units", saved);
      window.location.reload();
    } else {
      alert("No saved data for this mission.");
      if (window.BMSLog) window.BMSLog(`No data found for ${mission}`, "warn");
    }
  };

  return (
    <aside className="sidebar">
      {/* 🔰 Commander Section */}
      <div className="sidebar-section commander">
        <h3 className="commander-title">Commander</h3>
        <p className="commander-name">{commanderName}</p>
      </div>

      {/* 🎯 Mission Section */}
      <div className="sidebar-section">
        <h4 className="sidebar-title">Mission</h4>
        <select
          className="mission-select"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
        >
          {missions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <div className="mission-actions">
          <button onClick={saveMission}>Save</button>
          <button onClick={loadMission}>Load</button>
          <button onClick={() => window.clearAllMarkers()}>Clear</button>
        </div>
      </div>

      {/* 🪖 Units Section */}
      <div className="sidebar-section">
        <h4 className="sidebar-title">Units</h4>
        <div className="icon-grid">
          <button draggable onDragStart={(e) => e.dataTransfer.setData("unitType", "soldier")}>
            Soldier
          </button>
          <button draggable onDragStart={(e) => e.dataTransfer.setData("unitType", "tank")}>
            Tank
          </button>
          <button draggable onDragStart={(e) => e.dataTransfer.setData("unitType", "base")}>
            Base
          </button>
        </div>
      </div>

      {/* 🎯 Targets Section */}
      <div className="sidebar-section">
        <h4 className="sidebar-title">Targets</h4>
        <div className="icon-grid">
          <button draggable onDragStart={(e) => e.dataTransfer.setData("unitType", "target")}>
            Enemy
          </button>
          <button draggable onDragStart={(e) => e.dataTransfer.setData("unitType", "radar")}>
            Radar
          </button>
        </div>
      </div>
    </aside>
  );
}
