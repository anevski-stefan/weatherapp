import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

console.log("All env variables:", process.env);
console.log("API KEY:", process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY);


const API_KEY = process.env.API_KEY;

export const fetchWeatherData = async (query: string): Promise<WeatherData> => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${API_KEY}`);
  return response.data;
};

export const fetchAirQuality = async (lat: number, lon: number): Promise<number> => {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  return response.data.list[0].main.aqi;
};

export const fetchForecast = async (query: string): Promise<ForecastData> => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&appid=${API_KEY}`);
  return response.data;
};

export const fetchUVIndex = async (lat: number, lon: number): Promise<number> => {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  return response.data.value;
};