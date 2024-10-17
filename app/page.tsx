"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WeatherDisplay } from "../components/WeatherDisplay";
import { SearchForm } from "../components/SearchForm";
import {
  fetchWeatherData,
  fetchAirQuality,
  fetchForecast,
  fetchUVIndex,
  fetchWeatherAlerts,
  fetchCitySuggestions,
} from "../lib/api";
import { WeatherData, ForecastData, AlertData } from "../types/weather";
import { ForecastDisplay } from "../components/ForecastDisplay";
import { WeatherAlerts } from "../components/WeatherAlerts";
import axios from "axios";

export default function Home() {
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<number | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [uvIndex, setUVIndex] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError("");
    console.log("Fetching weather for query:", query);

    try {
      const weather = await fetchWeatherData(query);
      console.log("Weather data received:", weather);
      setWeatherData(weather);

      const { lat, lon } = weather.coord;
      console.log(`Coordinates: lat ${lat}, lon ${lon}`);

      const aqi = await fetchAirQuality(lat, lon);
      console.log("Air Quality Index:", aqi);
      setAirQuality(aqi);

      const forecastData = await fetchForecast(`lat=${lat}&lon=${lon}`);
      console.log("Forecast data received:", forecastData);
      setForecast(forecastData);

      const uvi = await fetchUVIndex(lat, lon);
      console.log("UV Index:", uvi);
      setUVIndex(uvi);

      const alertsData = await fetchWeatherAlerts(lat, lon);
      console.log("Weather alerts:", alertsData);
      setAlerts(alertsData);
    } catch (err: any) {
      console.error("Error in fetchWeather:", err);
      handleFetchError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchError = (err: any) => {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
        setError(`Error: ${err.response.data.message || err.message}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response received from the server. Please try again.");
      } else {
        console.error("Error message:", err.message);
        setError(`An error occurred: ${err.message}`);
      }
    } else {
      console.error("Non-Axios error:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
    setWeatherData(null);
    setAirQuality(null);
    setForecast(null);
    setUVIndex(null);
    setAlerts([]);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Got coordinates: lat ${latitude}, lon ${longitude}`);
          fetchWeather(`lat=${latitude}&lon=${longitude}`);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(`Geolocation error: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(`q=${encodeURIComponent(searchCity.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
          Weather Forecast
        </h1>
        <SearchForm
          city={searchCity}
          setCity={setSearchCity}
          onSubmit={handleSearch}
          fetchSuggestions={fetchCitySuggestions}
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
                uvIndex={uvIndex}
              />
              <WeatherAlerts alerts={alerts} />
              <ForecastDisplay forecast={forecast} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
