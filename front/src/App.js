import React, { useState, useEffect } from "react";
import MapView from "./components/MapView.js";
import NavigationPanel from "./components/NavigationPanel.js";
import RouteInfo from "./components/RouteInfo.js";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App = () => {
  const [currentDay, setCurrentDay] = useState(1); // Jour actuel
  const [dayData, setDayData] = useState(null); // Données récupérées pour le jour actuel
  const [calculatedRoutesInfo, setCalculatedRoutesInfo] = useState([]); // Stocker les itinéraires calculés
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Charger les données dynamiquement depuis l'API
  useEffect(() => {
    const fetchDayData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/api/voyages/1/days/${currentDay}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setDayData(data); // Stocker les données du jour
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError("Impossible de charger les données du voyage.");
        setLoading(false);
      }
    };

    fetchDayData();
  }, [currentDay]);

  // Gestion des états de chargement et d'erreur
  if (loading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!dayData) return <div>Aucune donnée disponible pour ce jour.</div>;

  return (
    <div className="app-container">
      <NavigationPanel
        currentDay={currentDay}
        totalDays={3}
        onDayChange={setCurrentDay}
      />

      <div className="map-layout">
        {/* Transmission des données complètes */}
        <RouteInfo 
          routes={dayData.routes} 
          locations={dayData.locations} 
          calculatedRoutes={calculatedRoutesInfo}
        />
        <MapView
          locations={dayData.locations || []}
          routes={dayData.routes || []}
          onRoutesCalculated={setCalculatedRoutesInfo}
        />
      </div>
    </div>
  );
};

export default App;
