import React, { useState } from "react";
import MapView from "./components/MapView.js";
import NavigationPanel from "./components/NavigationPanel.js";
import RouteInfo from "./components/RouteInfo.js";
import data from "./data/voyage1.json";
import "leaflet/dist/leaflet.css";
import "./App.css"; // Ajoutez un fichier CSS pour les styles

const App = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [calculatedRoutesInfo, setCalculatedRoutesInfo] = useState([]); // Stocker les infos des itinéraires

  const dayData = data.days.find((day) => day.day === currentDay);

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
          onRoutesCalculated={setCalculatedRoutesInfo} // Callback pour récupérer les infos des itinéraires
        />
      </div>
    </div>
  );
};

export default App;