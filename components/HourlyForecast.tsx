import React from "react";
import { motion } from "framer-motion";
import { WiRaindrop, WiStrongWind } from "react-icons/wi";
import { ForecastItem } from "../types/weather";

interface HourlyForecastProps {
  hourlyData: ForecastItem[];
  className?: string;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyData,
  className,
}) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <div>No forecast data available</div>;
  }

  const currentHour = new Date().getHours();
  const startIndex = hourlyData.findIndex(
    (item) => new Date(item.dt * 1000).getHours() === currentHour
  );

  // If we can't find the current hour, start from the beginning
  const adjustedStartIndex = startIndex === -1 ? 0 : startIndex;

  // Get 24 hours worth of data (8 items if they're 3 hours apart)
  const next24Hours = hourlyData.slice(
    adjustedStartIndex,
    adjustedStartIndex + 8
  );

  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-lg p-4 mb-8 w-full ${className}`}
    >
      <h3 className="text-xl font-semibold mb-4 text-white">
        24-Hour Forecast
      </h3>
      <div className="overflow-x-auto">
        <div className="flex justify-between w-full min-w-max">
          {next24Hours.map((item, index) => (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center bg-gray-700 rounded-lg p-3 mx-1 w-24"
            >
              <p className="text-sm text-gray-300">
                {new Date(item.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              {item.weather && item.weather[0] && (
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                  className="w-10 h-10"
                />
              )}
              <p className="text-xs text-gray-400">
                {item.weather && item.weather[0] && item.weather[0].description}
              </p>
              <p className="font-semibold text-white">
                {Math.round(item.main.temp)}°C
              </p>
              <div className="flex items-center text-sm text-blue-300">
                <WiRaindrop className="mr-1" />
                <span>{Math.round(item.pop * 100)}%</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <WiStrongWind className="mr-1" />
                <span>{Math.round(item.wind.speed)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
