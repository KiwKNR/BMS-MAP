import React, { useEffect, useState } from "react";
import "./styles/unitinfo.css";

export default function UnitInfoPanel() {
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    window.updateUnitInfo = (data) => setUnit(data);
    return () => {
      window.updateUnitInfo = null;
    };
  }, []);

  return (
    <div className={`unit-panel ${unit ? "active" : ""}`}>
      <div className="unit-header">Unit Information</div>

      {unit ? (
        <div className="unit-details">
          <div className="unit-line">
            <span className="unit-label">ID:</span>
            <span className="unit-value">{unit.id}</span>
          </div>
          <div className="unit-line">
            <span className="unit-label">Type:</span>
            <span className="unit-value">{unit.type}</span>
          </div>
          <div className="unit-line">
            <span className="unit-label">Latitude:</span>
            <span className="unit-value">{unit.lat.toFixed(4)}</span>
          </div>
          <div className="unit-line">
            <span className="unit-label">Longitude:</span>
            <span className="unit-value">{unit.lng.toFixed(4)}</span>
          </div>
          <div className="unit-line">
            <span className="unit-label">Status:</span>
            <span className="unit-value online">Active</span>
          </div>
        </div>
      ) : (
        <div className="unit-empty">No unit selected</div>
      )}
    </div>
  );
}
