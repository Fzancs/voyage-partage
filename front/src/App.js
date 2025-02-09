import React, { useState, useEffect } from "react";
import MapView from "./components/MapView.js";
import NavigationPanel from "./components/NavigationPanel.js";
import RouteInfo from "./components/RouteInfo.js";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App = () => {
  const [voyages, setVoyages] = useState([]); // Liste des voyages récupérés depuis l'API
  const [currentVoyage, setCurrentVoyage] = useState(null); // Voyage actuel
  const [currentDay, setCurrentDay] = useState(1); // Jour actuel
  const [dayData, setDayData] = useState(null); // Données récupérées pour le jour actuel
  const [calculatedRoutesInfo, setCalculatedRoutesInfo] = useState([]); // Stocker les itinéraires calculés
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Charger la liste des voyages au montage
  useEffect(() => {
    const fetchVoyages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/voyages`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const voyagesData = await response.json();
        setVoyages(voyagesData);
        setCurrentVoyage(voyagesData[0]?.id || null); // Sélectionner le premier voyage par défaut
      } catch (err) {
        console.error("Erreur lors de la récupération des voyages :", err);
        setError("Impossible de charger la liste des voyages.");
      }
    };

    fetchVoyages();
  }, []);

  // Charger les données du jour sélectionné pour le voyage actuel
  useEffect(() => {
    if (!currentVoyage) return;

    const fetchDayData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/api/voyages/${currentVoyage}/days/${currentDay}`);
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
  }, [currentVoyage, currentDay]);

  // Trouver le nombre total de jours pour le voyage actuel
  const totalDays = voyages.find((voyage) => voyage.id === currentVoyage)?.totalDays || 1;

  // Gestion des états de chargement et d'erreur
  if (loading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!dayData) return <div>Aucune donnée disponible pour ce jour.</div>;

  return (
    <div className="app-container">
      {/* Navigation avec sélection du voyage */}
      <NavigationPanel
        currentDay={currentDay}
        totalDays={totalDays} // Utiliser le nombre correct de jours
        onDayChange={setCurrentDay}
        currentVoyage={currentVoyage}
        voyages={voyages}
        onVoyageChange={(voyageId) => {
          setCurrentVoyage(voyageId);
          setCurrentDay(1); // Réinitialiser au premier jour du nouveau voyage
        }}
      />

      {/* Affichage de la carte et des itinéraires */}
      <div className="map-layout">
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
