"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchForm } from "../components/SearchForm";
import { MultiLocationDisplay } from "../components/MultiLocationDisplay";
import { SavedCitiesList } from "../components/SavedCities";
import { WeatherData } from "../types/weather";
import {
  fetchWeatherData,
  fetchAirQuality,
  fetchForecast,
  fetchUVIndex,
  fetchWeatherAlerts,
} from "../lib/api";
import { fetchCitySuggestions } from "../lib/api";

const STORAGE_KEY = "savedWeatherLocations";

export default function Home() {
  const [locations, setLocations] = useState<WeatherData[]>([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<
    number | null
  >(null);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLocations = localStorage.getItem(STORAGE_KEY);
    if (savedLocations) {
      const parsedLocations = JSON.parse(savedLocations);
      setLocations(parsedLocations);
      if (parsedLocations.length > 0) {
        setSelectedLocationIndex(0);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient && locations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    }
  }, [locations, isClient]);

  const handleFetchError = (error: any) => {
    console.error("Error in handleFetchError:", error);

    if (error.response) {
      if (error.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else if (error.response.status === 401) {
        setError("API key is invalid. Please check your configuration.");
      } else if (error.response.status === 400) {
        setError(
          "Invalid request. Please try again with a different city name."
        );
      } else if (error.response.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(
          `An error occurred: ${
            error.response.data.message || error.response.statusText
          }`
        );
      }
    } else if (error.request) {
      setError(
        "No response received from the weather service. Please check your internet connection and try again."
      );
    } else if (error.message && error.message.includes("Network Error")) {
      setError(
        "Network error. Please check your internet connection and try again."
      );
    } else {
      setError(`An unexpected error occurred: ${error.message}`);
    }
  };

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError("");
    console.log("Fetching weather for query:", query);

    try {
      const weather = await fetchWeatherData(query);
      console.log("Weather data received:", weather);

      const cityExists = locations.findIndex(
        (location) => location.name.toLowerCase() === weather.name.toLowerCase()
      );
      if (cityExists !== -1) {
        setSelectedLocationIndex(cityExists);
        setLoading(false);
        return;
      }

      const { lat, lon } = weather.coord;
      const [aqi, forecastData, uvi, alertsData] = await Promise.all([
        fetchAirQuality(lat, lon),
        fetchForecast(`lat=${lat}&lon=${lon}`),
        fetchUVIndex(lat, lon),
        fetchWeatherAlerts(lat, lon),
      ]);

      const newLocation = {
        ...weather,
        airQuality: aqi,
        forecast: forecastData,
        uvIndex: uvi,
        alerts: alertsData,
      };

      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setSelectedLocationIndex(locations.length);
    } catch (err: any) {
      console.error("Error in fetchWeather:", err);
      handleFetchError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(searchCity);
      setSearchCity("");
    }
  };

  const handleRemoveLocation = (index: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
    if (selectedLocationIndex === index) {
      setSelectedLocationIndex(locations.length > 1 ? 0 : null);
    } else if (
      selectedLocationIndex !== null &&
      selectedLocationIndex > index
    ) {
      setSelectedLocationIndex(selectedLocationIndex - 1);
    }
  };

  const handleSelectCity = (index: number) => {
    setSelectedLocationIndex(index);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 flex">
      <div className="mr-4 flex-shrink-0">
        <SavedCitiesList
          locations={locations}
          onSelectCity={handleSelectCity}
          onRemoveLocation={handleRemoveLocation}
          selectedIndex={selectedLocationIndex}
        />
      </div>
      <div className="flex-grow max-w-4xl mx-auto">
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
          {selectedLocationIndex !== null &&
            locations[selectedLocationIndex] && (
              <MultiLocationDisplay
                key={locations[selectedLocationIndex].name}
                location={locations[selectedLocationIndex]}
              />
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
