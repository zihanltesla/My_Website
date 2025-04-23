// src/components/About/TravelMap.js
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TravelMap.css";

const emojiIcon = new L.DivIcon({
  html: "<div class='marker-emoji'>📍</div>",
  iconSize: [30, 30],
  className: "emoji-marker",
});

const places = [
  { name: "🇨🇳 Beijing, China", lat: 39.9042, lng: 116.4074, photo: require("../../Assets/swiss.jpg") },
  { name: "🇫🇷 Paris, France", lat: 48.8566, lng: 2.3522, photo: require("../../Assets/paris.jpg") },
  { name: "🇩🇪 Frankfurt, Germany", lat: 50.1109, lng: 8.6821, photo: require("../../Assets/swiss.jpg") },
  { name: "🇸🇪 Gothenburg, Sweden", lat: 57.7089, lng: 11.9746, photo: require("../../Assets/sweden.jpg") },
  { name: "🇸🇪 Stockholm, Sweden", lat: 59.3293, lng: 18.0686, photo: require("../../Assets/swiss.jpg") },
  { name: "🇪🇸 Gran Canaria, Spain", lat: 28.1235, lng: -15.4363, photo: require("../../Assets/swiss.jpg") },
  { name: "🇮🇹 Milan, Italy", lat: 45.4642, lng: 9.1900, photo: require("../../Assets/swiss.jpg") },
  { name: "🇪🇸 Madrid, Spain", lat: 40.4168, lng: -3.7038, photo: require("../../Assets/swiss.jpg") },
  { name: "🇧🇪 Belgium", lat: 50.8503, lng: 4.3517, photo: require("../../Assets/swiss.jpg") },
  { name: "🇨🇿 Prague, Czech Republic", lat: 50.0755, lng: 14.4378, photo: require("../../Assets/swiss.jpg") },
  { name: "🇨🇭 Zurich, Switzerland", lat: 47.3769, lng: 8.5417, photo: require("../../Assets/swiss.jpg") },
  { name: "🇸🇬 Singapore", lat: 1.3521, lng: 103.8198, photo: require("../../Assets/swiss.jpg") },
  { name: "🇲🇾 Kuala Lumpur, Malaysia", lat: 3.1390, lng: 101.6869, photo: require("../../Assets/swiss.jpg") },
  { name: "🇨🇳 Nanning, China", lat: 22.8170, lng: 108.3669, photo: require("../../Assets/swiss.jpg") },
  { name: "🇨🇳 Shanghai, China", lat: 31.2304, lng: 121.4737, photo: require("../../Assets/swiss.jpg") },
  { name: "🇭🇰 Hong Kong", lat: 22.3193, lng: 114.1694, photo: require("../../Assets/swiss.jpg") },
  { name: "🇻🇳 Vietnam", lat: 21.0285, lng: 105.8542, photo: require("../../Assets/swiss.jpg") },
  { name: "🇸🇦 Saudi Arabia", lat: 24.7136, lng: 46.6753, photo: require("../../Assets/swiss.jpg") },
  { name: "🇶🇦 Qatar", lat: 25.276987, lng: 51.520008, photo: require("../../Assets/swiss.jpg") },
  { name: "🇫🇮 Levi, Finland", lat: 67.8057, lng: 24.8028, photo: require("../../Assets/swiss.jpg") },
  { name: "🇫🇮 Helsinki, Finland", lat: 60.1695, lng: 24.9354, photo: require("../../Assets/swiss.jpg") },
  { name: "🇳🇴 Oslo, Norway", lat: 59.9139, lng: 10.7522, photo: require("../../Assets/swiss.jpg") },
];

function AnimatedMarker({ place }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

  return (
    <Marker position={[place.lat, place.lng]} icon={emojiIcon} ref={markerRef}>
      <Popup closeButton={false}>
        <div className="popup-animation">
          <div style={{ fontSize: "14px", marginBottom: "5px" }}>{place.name}</div>
          <img
            src={place.photo}
            alt={place.name}
            style={{
              width: "120px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          />
        </div>
      </Popup>
    </Marker>
  );
}

function TravelMap() {
  const [visibleMarkers, setVisibleMarkers] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < places.length) {
        setVisibleMarkers((prev) => [...prev, places[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[30, 100]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%", borderRadius: "16px", overflow: "hidden" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {visibleMarkers.map((place, index) => (
          <AnimatedMarker key={index} place={place} />
        ))}
      </MapContainer>
    </div>
  );
}

export default TravelMap;
