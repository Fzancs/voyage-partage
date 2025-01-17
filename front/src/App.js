import React, { useState } from "react";
import MapView from "./components/MapView.js";
import NavigationPanel from "./components/NavigationPanel.js";
import RouteInfo from "./components/RouteInfo.js";
import data from "./data/voyage1.json";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [currentDay, setCurrentDay] = useState(1);

  const dayData = data.days.find((day) => day.day === currentDay);

  return (
    <div>
      <NavigationPanel
        currentDay={currentDay}
        totalDays={data.days.length}
        onDayChange={setCurrentDay}
      />
      <MapView
        locations={dayData.locations}
        routes={dayData.routes}
      />
      <RouteInfo routes={dayData.routes} />
    </div>
  );
};

export default App;