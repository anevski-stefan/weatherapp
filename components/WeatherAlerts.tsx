import React from "react";
import { WeatherAlert } from "../types/weather";

interface WeatherAlertsProps {
  alerts?: WeatherAlert[] | undefined;
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Weather Alerts</h3>
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-2"
        >
          <p className="font-bold">{alert.event}</p>
          <p>{alert.description}</p>
          <p className="text-sm">
            From: {new Date(alert.start * 1000).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};
