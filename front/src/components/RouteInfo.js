import React from "react";

const RouteInfo = ({ routes }) => {
  return (
    <div className="route-info">
      <h2>Informations sur les itinéraires</h2>
      {routes.map((route, index) => (
        <div key={index}>
          <p>
            <strong>Mode :</strong> {route.mode === "foot-walking" ? "Piéton" : "Voiture"} <br />
            <strong>Distance :</strong> {route.distance} km <br />
            <strong>Durée :</strong> {route.duration} min
          </p>
        </div>
      ))}
      <div className="legend">
        <span style={{ color: "blue" }}>■ A pied</span>
        <span style={{ color: "red", marginLeft: "10px" }}>■ En voiture</span>
      </div>
    </div>
  );
};

export default RouteInfo;