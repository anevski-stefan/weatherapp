import axios from 'axios';
import { WeatherData, ForecastData, AlertData, HourlyData} from '../types/weather';

const API_KEY = process.env.API_KEY;

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  console.log(`Fetching weather data from: https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
  return response.data;
};

export const fetchHourlyForecast = async (lat: number, lon: number): Promise<HourlyData[]> => {
  console.log(`Fetching hourly forecast for lat: ${lat}, lon: ${lon}`);
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    console.log("Hourly forecast API response:", response.data);
    
    if (response.data && response.data.list) {
      const hourlyData = response.data.list.map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        weather: item.weather,
        pop: item.pop,
        wind_speed: item.wind.speed
      }));
      console.log("Processed hourly data:", hourlyData);
      return hourlyData;
    } else {
      console.error("Unexpected API response structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching hourly forecast:", error);
    return [];
  }
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

export const fetchWeatherAlerts = async (lat: number, lon: number): Promise<AlertData[]> => {
  try {
    const response = await axios.get<{ list: ForecastData['list'] }>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return generateAlertsFromForecast({ list: response.data.list });
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    return [];
  }
};

function generateAlertsFromForecast(forecast: ForecastData): AlertData[] {
  const alertMap: Record<string, AlertData> = {};

  forecast.list.forEach((item) => {
    const { main, weather, dt } = item;

    // Temperature alerts
    if (main.temp > 35) {
      updateAlert(alertMap, 'Extreme Heat', 'High temperatures in the forecast. Stay hydrated and avoid prolonged sun exposure.', dt);
    } else if (main.temp < 0) {
      updateAlert(alertMap, 'Freezing Conditions', 'Temperatures below freezing in the forecast. Be cautious of icy conditions and dress warmly.', dt);
    }

    // Weather condition alerts
    if (weather && weather.length > 0) {
      const description = weather[0].description.toLowerCase();
      if (description.includes('thunderstorm')) {
        updateAlert(alertMap, 'Thunderstorm Warning', 'Thunderstorms in the forecast. Stay indoors and avoid open areas when they occur.', dt);
      } else if (description.includes('rain') && (description.includes('heavy') || description.includes('intense'))) {
        updateAlert(alertMap, 'Heavy Rain', 'Significant rainfall in the forecast. Be aware of potential flooding in low-lying areas.', dt);
      } else if (description.includes('snow')) {
        updateAlert(alertMap, 'Snow Warning', 'Snowfall in the forecast. Prepare for potential travel disruptions and slippery conditions.', dt);
      }
    }
  });

  return Object.values(alertMap);
}

function updateAlert(alertMap: Record<string, AlertData>, event: string, description: string, timestamp: number) {
  if (!alertMap[event]) {
    alertMap[event] = createAlert(event, description, timestamp);
  }
}

function createAlert(event: string, description: string, timestamp: number): AlertData {
  return {
    sender_name: 'Weather App',
    event,
    start: timestamp,
    description,
    tags: [event.split(' ')[0]],
  };
}

export const fetchCitySuggestions = async (query: string): Promise<string[]> => {
  const response = await axios.get(`/api/city-suggestions?query=${query}`);
  return response.data;
};