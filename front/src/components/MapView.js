import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Correction pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapView = ({ locations = [] }) => {
  const [calculatedRoutes, setCalculatedRoutes] = useState([]);

  const fetchRoute = async (start, end) => {
    const apiKey = "5b3ce3597851110001cf62487d5b6c20d2b746178b3c00b91fc16ba6";
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;

    try {
      const response = await axios.get(url);
      const geometry = response.data.features[0].geometry.coordinates;

      // Convertir les coordonnées [lon, lat] en [lat, lon] pour Leaflet
      const routeCoordinates = geometry.map((coord) => [coord[1], coord[0]]);
      return routeCoordinates;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'itinéraire :", error);
      return [];
    }
  };

  useEffect(() => {
    const calculateRoutes = async () => {
      const allRoutes = [];
      for (let i = 0; i < locations.length - 1; i++) {
        const start = locations[i].position;
        const end = locations[i + 1].position;
        const route = await fetchRoute(start, end);
        allRoutes.push(route);
      }
      setCalculatedRoutes(allRoutes);
    };

    if (locations.length > 1) {
      calculateRoutes();
    }
  }, [locations]);

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "80vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Afficher les marqueurs */}
      {locations.map((loc, index) => (
        <Marker key={index} position={loc.position}>
          <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
            {loc.name}
          </Tooltip>
          <Popup>
            <h3>{loc.name}</h3>
            <p>{loc.description}</p>
            <p>Arrivée : {loc.arrival} <br /> Départ : {loc.departure}</p>
          </Popup>
        </Marker>
      ))}

      {/* Afficher les itinéraires */}
      {calculatedRoutes.map((route, index) => (
        <Polyline key={index} positions={route} color="blue" />
      ))}
    </MapContainer>
  );
};

export default MapView;