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
  fetchCitySuggestions,
} from "../lib/api";

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

  useEffect(() => {
    if (selectedLocationIndex !== null && locations[selectedLocationIndex]) {
      console.log(
        "Selected location updated:",
        locations[selectedLocationIndex]
      );
    }
  }, [locations, selectedLocationIndex]);

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

      const { lat, lon } = weather.coord;
      console.log("Fetching additional data for lat:", lat, "lon:", lon);

      const [aqi, forecastData, uvi, alertsData] = await Promise.all([
        fetchAirQuality(lat, lon),
        fetchForecast(`lat=${lat}&lon=${lon}`),
        fetchUVIndex(lat, lon),
        fetchWeatherAlerts(lat, lon),
      ]);

      // Extract hourly forecast from forecastData
      const hourlyForecast = forecastData.list.map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        weather: item.weather,
        pop: item.pop,
        wind_speed: item.wind.speed,
      }));

      console.log("Hourly forecast data:", hourlyForecast);

      const newLocation = {
        ...weather,
        airQuality: aqi,
        forecast: forecastData,
        uvIndex: uvi,
        alerts: alertsData,
        hourlyForecast: hourlyForecast, // Add this line
      };

      console.log("New location with hourly forecast:", newLocation);

      setLocations((prevLocations) => {
        const updatedLocations = [...prevLocations, newLocation];
        console.log("Updated locations:", updatedLocations);
        return updatedLocations;
      });
      setSelectedLocationIndex(locations.length);
    } catch (err) {
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
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4">
          <div className="w-64 flex-shrink-0">
            {/* This div is empty to align with the search bar */}
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
              Weather Forecast
            </h1>
            <SearchForm
              city={searchCity}
              setCity={setSearchCity}
              onSubmit={handleSearch}
              fetchSuggestions={fetchCitySuggestions}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-64 flex-shrink-0">
            <SavedCitiesList
              locations={locations}
              onSelectCity={handleSelectCity}
              onRemoveLocation={handleRemoveLocation}
              selectedIndex={selectedLocationIndex}
            />
          </div>
          <div className="flex-grow">
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
      </div>
    </div>
  );
}
