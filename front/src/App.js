import React, { useState } from "react";
import MapView from "./components/MapView.js";
import NavigationPanel from "./components/NavigationPanel.js";
import RouteInfo from "./components/RouteInfo.js";
import data from "./data/voyages.json";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App = () => {
  const [currentDay, setCurrentDay] = useState(1); // Jour actuel
  const [calculatedRoutesInfo, setCalculatedRoutesInfo] = useState([]); // Stocker les itinéraires calculés

  // Trouver les données du jour actuel
  const dayData = data.days.find((day) => day.day === currentDay);

  if (!dayData) {
    return <div>Aucun jour disponible pour ce voyage.</div>;
  }

  return (
    <div className="app-container">
      <NavigationPanel
        currentDay={currentDay}
        totalDays={data.days.length}
        onDayChange={setCurrentDay}
      />

      <div className="map-layout">
        <RouteInfo routes={calculatedRoutesInfo} />
        <MapView
          locations={dayData.locations}
          routes={dayData.routes}
          onRoutesCalculated={setCalculatedRoutesInfo}
        />
      </div>
    </div>
  );
};

export default App;