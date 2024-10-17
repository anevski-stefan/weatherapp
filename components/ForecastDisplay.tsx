import React from "react";
import { ForecastData } from "../types/weather";
import { motion } from "framer-motion";

interface ForecastDisplayProps {
  forecast: ForecastData | null;
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({
  forecast,
}) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) return null;

  const getDailyForecasts = (forecastList: ForecastData["list"]) => {
    const dailyForecasts: ForecastData["list"][0][] = [];
    const seenDates = new Set<string>();

    for (const item of forecastList) {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString(); // Use date string for comparison

      if (!seenDates.has(dateString)) {
        seenDates.add(dateString);
        dailyForecasts.push(item);

        if (dailyForecasts.length === 5) break; // Stop after getting 5 days
      }
    }

    return dailyForecasts;
  };

  const dailyForecasts = getDailyForecasts(forecast.list);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((item, index) => {
          const date = new Date(item.dt * 1000);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700 rounded-lg p-4 flex flex-col items-center"
            >
              <p className="text-sm text-gray-400 mb-1">
                {date.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm mb-2">
                {date.toLocaleDateString("en-US", { weekday: "long" })}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="w-16 h-16"
              />
              <p className="text-xl font-semibold mt-2">
                {Math.round(item.main.temp)}°C
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {item.weather[0].description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDisplay;
