import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Correction pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapView = ({ locations = [], routes = [] }) => {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "80vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.length > 0 &&
        locations.map((loc, index) => (
          <Marker key={index} position={loc.position}>
            <Popup>
              <h3>{loc.name}</h3>
              <p>{loc.description}</p>
              <p>Arrivée : {loc.arrival} <br /> Départ : {loc.departure}</p>
              {loc.photos &&
                loc.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={loc.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                ))}
            </Popup>
          </Marker>
        ))}
      {routes.length > 0 &&
        routes.map((route, index) => (
          <Polyline
            key={index}
            positions={route.positions}
            color={route.mode === "walking" ? "blue" : "red"}
          />
        ))}
    </MapContainer>
  );
};

export default MapView;