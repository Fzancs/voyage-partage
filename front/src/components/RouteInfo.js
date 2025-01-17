import React from "react";

const RouteInfo = ({ routes = [] }) => {
  return (
    <div className="route-info">
      <h2>Informations sur les itinéraires</h2>
      {routes.length > 0 ? (
        routes.map((route, index) => (
          <div key={index}>
            <p>
              <strong>Mode :</strong> {route.mode === "walking" ? "Piéton" : "Voiture"} <br />
              <strong>Temps :</strong> {route.time} <br />
              <strong>Distance :</strong> {route.distance}
            </p>
          </div>
        ))
      ) : (
        <p>Aucun itinéraire disponible pour ce jour.</p>
      )}
    </div>
  );
};

export default RouteInfo;