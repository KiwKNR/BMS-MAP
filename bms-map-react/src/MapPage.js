import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/map.css";
import MapSidebar from "./MapSidebar";
import TopBar from "./TopBar";
import SystemLog from "./SystemLog";
import UnitInfoPanel from "./UnitInfoPanel";
import tankIcon from "./icons/tank.png";

export default function MapPage({ onBackToCommand }) {
  const [mapMode, setMapMode] = useState(localStorage.getItem("mapMode") || "dark");

  useEffect(() => {
    // เมื่อมีการเรียกใช้ map ให้ทำการรีเฟรชใหม่
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const map = L.map("map", { zoomControl: false }).setView([13.6828, 100.4515], 14);

    const tiles = {
      light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    };

    L.tileLayer(tiles[mapMode], {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap & CartoDB",
    }).addTo(map);

    map.dragging.enable();

    // ใช้เมื่อแผนที่โหลดเสร็จ เพื่อแก้ปัญหาการรีเฟรช
    map.whenReady(() => {
      // ฟังก์ชั่นการสร้างและแสดง markers
      const getIcon = (type) => {
        if (type === "tank") return L.icon({ iconUrl: tankIcon, iconSize: [40, 40] });
        const markerIcons = {
          soldier: "🟩",
          base: "🟦",
          target: "🔺",
          radar: "🟨",
        };
        return L.divIcon({
          className: "custom-marker",
          html: markerIcons[type] || "⬛",
          iconSize: [28, 28],
        });
      };

      const saved = JSON.parse(localStorage.getItem("bms_units") || "[]");
      saved.forEach((u) => createMarker(u.type, L.latLng(u.lat, u.lng), getIcon(u.type)));

      function createMarker(unitType, latlng, icon) {
        const marker = L.marker(latlng, { icon, draggable: true }).addTo(map);
        marker.unitId = `${unitType}_${Math.floor(Math.random() * 10000)}`;

        marker.bindPopup(
          `<b>${unitType.toUpperCase()}</b><br>
           ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}<br>
           <small>ID: ${marker.unitId}</small><br>
           <button id="delete-marker" class="popup-delete">Delete</button>`
        );

        marker.on("click", () => {
          document.querySelectorAll(".leaflet-marker-icon").forEach((el) =>
            el.classList.remove("selected-unit")
          );
          if (marker._icon) marker._icon.classList.add("selected-unit");

          const pos = marker.getLatLng();
          if (window.updateUnitInfo)
            window.updateUnitInfo({
              id: marker.unitId,
              type: unitType,
              lat: pos.lat,
              lng: pos.lng,
            });

          if (window.BMSLog) window.BMSLog(`Selected unit: ${marker.unitId}`, "info");
        });

        marker.on("contextmenu", () => {
          map.removeLayer(marker);
          saveAllMarkers();
          if (window.BMSLog) window.BMSLog(`Removed unit: ${marker.unitId}`, "warn");
          if (window.updateUnitInfo) window.updateUnitInfo(null);
        });

        marker.on("popupopen", (e) => {
          const btn = e.popup.getElement().querySelector("#delete-marker");
          if (btn)
            btn.addEventListener("click", () => {
              map.removeLayer(marker);
              saveAllMarkers();
              if (window.BMSLog) window.BMSLog(`Deleted unit: ${marker.unitId}`, "warn");
              if (window.updateUnitInfo) window.updateUnitInfo(null);
            });
        });

        marker.on("dragend", (e) => {
          saveAllMarkers();
          const pos = e.target.getLatLng();
          if (window.updateUnitInfo)
            window.updateUnitInfo({
              id: marker.unitId,
              type: unitType,
              lat: pos.lat,
              lng: pos.lng,
            });
          if (window.BMSLog)
            window.BMSLog(
              `Moved ${marker.unitId} to (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`,
              "info"
            );
        });

        saveAllMarkers();
        return marker;
      }

      // Drag & Drop
      map.getContainer().addEventListener("drop", (e) => {
        e.preventDefault();
        const unitType = e.dataTransfer.getData("unitType");
        if (!unitType) return;

        const rect = map.getContainer().getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const point = map.containerPointToLatLng([x, y]);
        createMarker(unitType, point, getIcon(unitType));

        if (window.BMSLog)
          window.BMSLog(
            `Deployed ${unitType} at (${point.lat.toFixed(4)}, ${point.lng.toFixed(4)})`,
            "deploy"
          );
      });

      map.getContainer().addEventListener("dragover", (e) => e.preventDefault());

      // Save markers
      function saveAllMarkers() {
        const all = [];
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const { lat, lng } = layer.getLatLng();
            const type = layer
              .getPopup()
              ?.getContent()
              ?.split("<b>")[1]
              ?.split("</b>")[0]
              ?.toLowerCase();
            if (type) all.push({ type, lat, lng });
          }
        });
        localStorage.setItem("bms_units", JSON.stringify(all));
      }

      window.clearAllMarkers = () => {
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) map.removeLayer(layer);
        });
        localStorage.removeItem("bms_units");
        if (window.BMSLog) window.BMSLog("All units cleared.", "warn");
        if (window.updateUnitInfo) window.updateUnitInfo(null);
      };

      // รีเฟรชขนาดของแผนที่
      map.invalidateSize();
    });

    return () => map.remove();
  }, [mapMode]);

  // ✅ Toggle Dark/Light
  const toggleMapMode = () => {
    const newMode = mapMode === "dark" ? "light" : "dark";
    setMapMode(newMode);
    localStorage.setItem("mapMode", newMode);
    if (window.BMSLog)
      window.BMSLog(`Map mode changed to ${newMode.toUpperCase()}`, "info");
  };

  return (
    <div className="map-page">
      <MapSidebar />
      {/* ✅ ส่ง props ไปที่ TopBar */}
      <TopBar mapMode={mapMode} onToggleMapMode={toggleMapMode} />
      <button className="back-button" onClick={onBackToCommand}>
        ◁ Back
      </button>
      <div id="map" />
      <SystemLog />
      <UnitInfoPanel />
    </div>
  );
}
