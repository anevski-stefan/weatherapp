import React from "react";
import { motion } from "framer-motion";
import { WeatherDisplay } from "./WeatherDisplay";
import { ForecastDisplay } from "./ForecastDisplay";
import { WeatherAlerts } from "./WeatherAlerts";
import { WeatherData } from "../types/weather";

interface MultiLocationDisplayProps {
  location: WeatherData;
}

export const MultiLocationDisplay: React.FC<MultiLocationDisplayProps> = ({
  location,
}) => {
  return (
    <motion.div
      key={location.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <WeatherDisplay
        weatherData={location}
        airQuality={location.airQuality}
        uvIndex={location.uvIndex}
      />
      <div className="mt-4">
        <ForecastDisplay forecast={location.forecast} />
      </div>
      <div className="mt-4">
        <WeatherAlerts alerts={location.alerts} />
      </div>
    </motion.div>
  );
};
