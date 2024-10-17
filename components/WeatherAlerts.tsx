import React from "react";
import { AlertData } from "../types/weather";
import { motion } from "framer-motion";

interface WeatherAlertsProps {
  alerts: AlertData[];
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Weather Alerts</h3>
      {alerts.map((alert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-red-600 rounded-lg p-4 mb-4"
        >
          <h4 className="text-xl font-bold">{alert.event}</h4>
          <p className="text-sm">Forecast period: {formatDate(alert.start)}</p>
          <p className="mt-2">{alert.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
