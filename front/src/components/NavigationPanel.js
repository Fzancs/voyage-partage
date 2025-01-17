import React from "react";

const NavigationPanel = ({ currentDay, totalDays, onDayChange }) => {
  return (
    <div className="navigation-panel">
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
  );
};

export default NavigationPanel;