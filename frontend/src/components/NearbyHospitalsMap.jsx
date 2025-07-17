import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FaRegHospital } from "react-icons/fa";
// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom User Icon (optional)
const userIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function SetViewOnLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);
  return null;
}

const NearbyHospitalsMap = () => {
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(10000);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => setError("Unable to retrieve your location")
    );
  }, []);

  useEffect(() => {
  if (!position) return;

  const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:${radius},${position[0]},${position[1]});
      node["amenity"="clinic"](around:${radius},${position[0]},${position[1]});
    );
    out;`;

  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  })
    .then((res) => res.json())
    .then((data) => setHospitals(data.elements || []))
    .catch(() => setError("Failed to fetch hospitals and clinics"));
}, [position, radius]);


  return (
    <div className="my-8 px-4 max-w-4xl mx-auto">
      <p className="text-3xl flex items-center justify-center gap-2 font-bold mb-4 text-center">
        Nearby Hospitals  <FaRegHospital /> </p>

      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      <div className="mb-4 flex flex-col md:flex-row md:items-center sm:items-center md:justify-center gap-3">
        <label className="font-medium text-gray-700 dark:text-white">
          Filter radius:
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="ml-2 border rounded px-2 py-1 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {/* <option value={2000}>2 km</option> */}
            <option value={10000}>10 km</option>
            <option value={20000}>20 km</option>
            <option value={50000}>50 km</option>
          </select>
        </label>
      </div>

      <div className="relative z-10 h-[50vh] w-full rounded-xl overflow-hidden shadow-lg border border-gray-300">
        {position ? (
          <MapContainer center={position} zoom={14} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={userIcon}>
              <Popup className="text-sm">You are here</Popup>
            </Marker>
            {hospitals.map((hosp) => {
  const type = hosp.tags?.amenity;

  const icon = new L.Icon({
    iconUrl:
      type === "clinic"
        ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Marker key={hosp.id} position={[hosp.lat, hosp.lon]} icon={icon}>
      <Popup className="text-sm">
        <strong>{hosp.tags?.name || 'hospital'}</strong>
        <br />
        {hosp.tags?.["addr:full"] ||
          `${hosp.tags?.["addr:street"] || ""} ${
            hosp.tags?.["addr:housenumber"] || ""
          }, ${hosp.tags?.["addr:city"] || ""}`}
        <br />
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${hosp.lat},${hosp.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Get Directions
        </a>
      </Popup>
    </Marker>
  );
})}

            <SetViewOnLocation position={position} />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600">
            Detecting your location...
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitalsMap;
