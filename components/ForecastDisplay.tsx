import { motion } from "framer-motion";
import { ForecastData } from "../types/weather";

interface ForecastDisplayProps {
  forecast: ForecastData | null;
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({
  forecast,
}) => {
  if (!forecast) return null;

  const dailyForecast = forecast.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {dailyForecast.map((day, index) => (
          <motion.div
            key={day.dt}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-semibold text-sm sm:text-base">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="mx-auto w-8 h-8 sm:w-12 sm:h-12"
            />
            <p className="text-base sm:text-lg font-semibold">
              {Math.round(day.main.temp)}°C
            </p>
            <p className="text-xs sm:text-sm text-gray-300">
              {day.weather[0].description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
