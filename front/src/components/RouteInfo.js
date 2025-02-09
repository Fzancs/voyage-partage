import React, { useState } from "react";

const RouteInfo = ({ routes, locations, calculatedRoutes }) => {
  const [showDetails, setShowDetails] = useState(false);

  const firstLocation = locations[routes[0]?.startIndex] || {};
  const lastLocation = locations[routes[routes.length - 1]?.endIndex] || {};
  const totalDuration = calculatedRoutes.reduce((sum, route) => sum + (route.duration || 0), 0);

  return (
    <div className="route-info-container">
      <div className="route-info">
        <h2>Résumé du trajet</h2>
        <p>
          <strong>Départ :</strong> {firstLocation.name || "Non défini"} <br />
          <strong>Arrivée :</strong> {lastLocation.name || "Non défini"} <br />
          <strong>Durée totale :</strong> {totalDuration} min
        </p>

        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Masquer les détails" : "Afficher les détails"}
        </button>
      </div>

      {showDetails && (
        <div className="route-details-popup">
          <div className="route-details-header">
            <h3>Détails des itinéraires</h3>
            <button className="close-popup" onClick={() => setShowDetails(false)}>
              ×
            </button>
          </div>

          <div className="route-details-content">
            {/* Timeline start */}
            <div className="timeline">
              {/* Première étape (point de départ) */}
              <div className="timeline-step">
                <div className="timeline-point">
                  <span className="timeline-info">
                    <strong>{firstLocation.name || "Non défini"}</strong> <br />
                    Arrivée : {firstLocation.arrival || "Non défini"} <br />
                    Départ : {firstLocation.departure || "Non défini"}
                  </span>
                </div>
              </div>

              {/* Itinéraires intermédiaires */}
              {routes.map((route, index) => {
                const startLocation = locations[route.startIndex];
                const endLocation = locations[route.endIndex];
                const calculatedRoute = calculatedRoutes[index] || {};
                const icon = route.mode === "foot-walking" ? "🚶" : "🚗";
                const lineClass = route.mode === "foot-walking" ? "line-walking" : "line-driving";

                return (
                  <React.Fragment key={index}>
                    {/* Ligne directrice */}
                    <div className="timeline-connector">
                      <span className="route-mode-icon">{icon}</span>
                      <div className={`timeline-line ${lineClass}`}></div>
                      <span className="route-duration">
                        {calculatedRoute.duration || "N/A"} min · {calculatedRoute.distance || "N/A"} km
                      </span>
                    </div>

                    {/* Point d'arrivée */}
                    <div className="timeline-step">
                      <div className="timeline-point">
                        <span className="timeline-info">
                          <strong>{endLocation?.name || "Non défini"}</strong> <br />
                          Arrivée : {endLocation?.arrival || "Non défini"} <br />
                          Départ : {endLocation?.departure || "Non défini"}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteInfo;
