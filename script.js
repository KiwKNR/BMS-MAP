// เริ่มต้นแผนที่
const map = L.map('map').setView([13.6828, 100.4515], 14);

// เพิ่มชั้นแผนที่ OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ===== เพิ่มไอคอน =====

// ฐานเรา
const baseIcon = L.icon({
  iconUrl: 'icons/base.png',
  iconSize: [40, 40],
});

const baseMarker = L.marker([13.6828, 100.4515], { icon: baseIcon })
  .addTo(map)
  .bindPopup('<b>Our Base</b>');

// รถถัง
const tankIcon = L.icon({
  iconUrl: 'icons/tank.png',
  iconSize: [40, 40],
});

const tankMarker = L.marker([13.685, 100.450], { icon: tankIcon })
  .addTo(map)
  .bindPopup('Tank 1');

// เป้าหมายศัตรู
const targetIcon = L.icon({
  iconUrl: 'icons/target.png',
  iconSize: [40, 40],
});

const targetMarker = L.marker([13.678, 100.455], { icon: targetIcon })
  .addTo(map)
  .bindPopup('Enemy Target');
