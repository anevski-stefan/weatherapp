import React from "react";
import { motion } from "framer-motion";
import { WeatherDisplay } from "./WeatherDisplay";
import { ForecastDisplay } from "./ForecastDisplay";
import { WeatherAlerts } from "./WeatherAlerts";
import { HourlyForecast } from "./HourlyForecast";
import { WeatherData, HourlyData } from "../types/weather";

interface MultiLocationDisplayProps {
  location: WeatherData;
}

export const MultiLocationDisplay: React.FC<MultiLocationDisplayProps> = ({
  location,
}) => {
  console.log("MultiLocationDisplay received location:", location);

  // Extract hourly forecast data from forecast.list
  const hourlyForecastData: HourlyData[] =
    location.forecast?.list?.map((item) => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather,
      pop: item.pop,
      wind_speed: item.wind.speed,
    })) || [];

  console.log("Extracted hourly forecast data:", hourlyForecastData);

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
        airQuality={location.airQuality ?? null}
        uvIndex={location.uvIndex ?? null}
      />
      <div className="mt-4">
        <ForecastDisplay forecast={location.forecast ?? null} />
      </div>
      <div className="w-full">
        {location.forecast &&
        location.forecast.list &&
        location.forecast.list.length > 0 ? (
          <HourlyForecast
            hourlyData={location.forecast.list}
            className="w-full"
          />
        ) : (
          <div>Forecast data not available</div>
        )}
      </div>
      <div className="mt-4">
        <WeatherAlerts alerts={location.alerts} />
      </div>
    </motion.div>
  );
};
