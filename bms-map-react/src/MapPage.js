import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/map.css";

function MapPage() {
  useEffect(() => {
    // ✅ ตรวจว่ามี map อยู่แล้วหรือยัง
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const map = L.map("map").setView([13.6828, 100.4515], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // ==== ไอคอน ====
    const baseIcon = L.icon({
      iconUrl: "icons/base.png",
      iconSize: [40, 40],
    });
    const tankIcon = L.icon({
      iconUrl: "icons/tank.png",
      iconSize: [40, 40],
    });
    const targetIcon = L.icon({
      iconUrl: "icons/target.png",
      iconSize: [40, 40],
    });

    // ==== Marker ====
    L.marker([13.6828, 100.4515], { icon: baseIcon })
      .addTo(map)
      .bindPopup("<b>Our Base</b>");
    L.marker([13.685, 100.45], { icon: tankIcon })
      .addTo(map)
      .bindPopup("Tank 1");
    L.marker([13.678, 100.455], { icon: targetIcon })
      .addTo(map)
      .bindPopup("Enemy Target");

    // ✅ cleanup เมื่อ component ถูก unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map"></div>;
}

export default MapPage;