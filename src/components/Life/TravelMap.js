// src/components/About/TravelMap.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 自定义 Emoji 图标样式
const emojiIcon = new L.DivIcon({
  html: "<div style='font-size: 24px;'>📍</div>",
  iconSize: [30, 30],
  className: "emoji-marker",
});


// 每个地点关联独立照片
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
];

function AnimatedMarker({ place }) {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.flyTo([place.lat, place.lng], 5, {
        duration: 1.5
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [map, place.lat, place.lng]);

  return (
    <Marker position={[place.lat, place.lng]} icon={emojiIcon}>
      <Popup
        offset={[0, -10]}
        autoOpen={true}
        closeButton={false}
        closeOnClick={false}
        autoPan={false}
      >
        <div style={{ textAlign: "center" }}>
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
    }, 1200);

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