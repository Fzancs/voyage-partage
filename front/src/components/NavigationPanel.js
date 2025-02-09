import React from "react";

const NavigationPanel = ({ currentDay, totalDays, onDayChange, currentVoyage, voyages, onVoyageChange }) => {
  return (
    <div className="navigation-panel">
      {/* Sélecteur de voyage à gauche */}
      <div className="voyage-selector">
        <label htmlFor="voyage-select">Voyage :</label>
        <select
          id="voyage-select"
          value={currentVoyage}
          onChange={(e) => onVoyageChange(parseInt(e.target.value))}
        >
          {voyages.map((voyage) => (
            <option key={voyage.id} value={voyage.id}>
              {voyage.name}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation entre les jours centrée */}
      <div className="day-navigation">
        <button onClick={() => onDayChange(1)} disabled={currentDay === 1}>
          Premier jour
        </button>
        <button onClick={() => onDayChange(currentDay - 1)} disabled={currentDay === 1}>
          Jour précédent
        </button>
        <span>Jour {currentDay} / {totalDays}</span>
        <button onClick={() => onDayChange(currentDay + 1)} disabled={currentDay === totalDays}>
          Jour suivant
        </button>
        <button onClick={() => onDayChange(totalDays)} disabled={currentDay === totalDays}>
          Dernier jour
        </button>
      </div>
      
      {/* Espace de remplissage à droite (pour équilibre visuel) */}
      <div className="spacer"></div>
    </div>
  );
};

export default NavigationPanel;