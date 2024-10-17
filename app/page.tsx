"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WeatherDisplay } from "../components/WeatherDisplay";
import { SearchForm } from "../components/SearchForm";
import { fetchWeatherData, fetchAirQuality, fetchForecast } from "../lib/api";
import { WeatherData, ForecastData } from "../types/weather";
import { ForecastDisplay } from "../components/ForecastDisplay";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<number | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const weather = await fetchWeatherData(query);
      setWeatherData(weather);
      const { lat, lon } = weather.coord;
      const aqi = await fetchAirQuality(lat, lon);
      setAirQuality(aqi);
      const forecastData = await fetchForecast(query);
      setForecast(forecastData);
    } catch (err: any) {
      console.error("Error fetching weather data:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again later."
      );
      setWeatherData(null);
      setAirQuality(null);
      setForecast(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`lat=${latitude}&lon=${longitude}`);
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
          Weather Forecast
        </h1>
        <SearchForm
          city={city}
          setCity={setCity}
          onSubmit={() => fetchWeather(`q=${city}`)}
        />
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-8"
            >
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </motion.div>
          )}
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-center mt-8"
            >
              {error}
            </motion.div>
          )}
          {weatherData && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherDisplay
                weatherData={weatherData}
                airQuality={airQuality}
              />
              <ForecastDisplay forecast={forecast} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
