import React, { useEffect, useState, useRef } from "react";
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

const MapView = ({ locations = [], routes = [], onRoutesCalculated = () => {} }) => {
  const [calculatedRoutes, setCalculatedRoutes] = useState([]);
  const routeCache = useRef({});

  const fetchRoute = async (start, end, mode) => {
    const apiKey = process.env.OPEN_ROUTE_SERVICE_API_KEY;
    const url = `https://api.openrouteservice.org/v2/directions/${mode}?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;

    try {
      const response = await axios.get(url);
      const route = response.data.features[0];
      const geometry = route.geometry.coordinates;
      const distance = route.properties.segments[0].distance;
      const duration = route.properties.segments[0].duration;

      return {
        coordinates: geometry.map((coord) => [coord[1], coord[0]]),
        distance: (distance / 1000).toFixed(2),
        duration: Math.ceil(duration / 60),
        mode,
      };
    } catch (error) {
      console.error("Erreur lors de la récupération de l'itinéraire :", error);
      return { coordinates: [], distance: 0, duration: 0, mode };
    }
  };

  useEffect(() => {
    const calculateRoutes = async () => {
      const cacheKey = JSON.stringify({ locations, routes });
      if (routeCache.current[cacheKey]) {
        const cachedRoutes = routeCache.current[cacheKey];
        setCalculatedRoutes(cachedRoutes);
        onRoutesCalculated(cachedRoutes);
        return;
      }

      const allRoutes = [];
      for (const route of routes) {
        const start = locations[route.startIndex].position;
        const end = locations[route.endIndex].position;
        const result = await fetchRoute(start, end, route.mode);
        allRoutes.push(result);
      }

      routeCache.current[cacheKey] = allRoutes;
      setCalculatedRoutes(allRoutes);
      onRoutesCalculated(allRoutes);
    };

    if (locations.length > 1 && routes.length > 0) {
      calculateRoutes();
    }
  }, [locations, routes, onRoutesCalculated]);

  return (
    <div className="map-view">
      <MapContainer center={locations[0]?.position || [0, 0]} zoom={13} style={{ height: "100%", width: "100%" }}>
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
              {loc.photos &&
                loc.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={loc.name}
                    style={{ width: "100%", height: "auto", marginBottom: "10px", cursor: "pointer" }}
                    onClick={() => window.open(photo, "_blank")}
                  />
                ))}
            </Popup>
          </Marker>
        ))}

        {/* Afficher les itinéraires */}
        {calculatedRoutes.map((route, index) => (
          <Polyline
            key={index}
            positions={route.coordinates}
            color={route.mode === "foot-walking" ? "blue" : "red"}
            dashArray={route.mode === "foot-walking" ? "5, 5" : "0, 0"}
          >
            <Popup>
              <p>
                <strong>Mode :</strong> {route.mode === "foot-walking" ? "Piéton" : "Voiture"} <br />
                <strong>Distance :</strong> {route.distance} km <br />
                <strong>Durée :</strong> {route.duration} min
              </p>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>

      {/* Légende en bas à droite */}
      <div className="route-legend">
      <span className="legend-foot">
      A pied<span className="dashed-line"></span>
      </span>
      <span style={{ color: "red", marginLeft: "10px" }}>■ </span> En voiture
      </div>

    </div>
  );
};

export default MapView;