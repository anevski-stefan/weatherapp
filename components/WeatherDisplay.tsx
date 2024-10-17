import { WeatherData } from "../types/weather";
import { FaTemperatureHigh, FaWind, FaTint, FaCompass } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  airQuality: number | null;
  uvIndex: number | null;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  airQuality,
  uvIndex,
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getAirQualityLabel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getUVIndexLabel = (uvi: number) => {
    if (uvi <= 2) return "Low";
    if (uvi <= 5) return "Moderate";
    if (uvi <= 7) return "High";
    if (uvi <= 10) return "Very High";
    return "Extreme";
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-bold">{weatherData.name}</h2>
        <p className="text-xl mt-2">{weatherData.weather[0].description}</p>
        {weatherData.dt && (
          <p className="text-lg text-gray-400 mt-1">
            {formatDate(weatherData.dt)}
          </p>
        )}
        <div className="text-center mt-4">
          <p className="text-5xl font-bold">
            {Math.round(weatherData.main.temp)}°C
          </p>
          <p className="text-xl">
            Feels like {Math.round(weatherData.main.feels_like)}°C
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <WeatherInfoCard
          icon={<FaTemperatureHigh />}
          label="High / Low"
          value={`${Math.round(weatherData.main.temp_max)}° / ${Math.round(
            weatherData.main.temp_min
          )}°`}
        />
        <WeatherInfoCard
          icon={<FaWind />}
          label="Wind"
          value={`${weatherData.wind.speed} m/s`}
        />
        <WeatherInfoCard
          icon={<FaTint />}
          label="Humidity"
          value={`${weatherData.main.humidity}%`}
        />
        <WeatherInfoCard
          icon={<FaCompass />}
          label="Pressure"
          value={`${weatherData.main.pressure} hPa`}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <WiSunrise className="text-3xl mr-2" />
          <span>
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center">
          <WiSunset className="text-3xl mr-2" />
          <span>
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </span>
        </div>
      </div>
      {airQuality !== null && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Air Quality</h3>
          <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-red-500"
              style={{ width: `${(airQuality / 300) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2">
            {airQuality} - {getAirQualityLabel(airQuality)}
          </p>
        </div>
      )}
      {uvIndex !== null && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">UV Index</h3>
          <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{ width: `${(uvIndex / 11) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2">
            {uvIndex.toFixed(1)} - {getUVIndexLabel(uvIndex)}
          </p>
        </div>
      )}
    </div>
  );
};

const WeatherInfoCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="bg-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center">
    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{icon}</div>
    <p className="text-xs sm:text-sm text-gray-300">{label}</p>
    <p className="text-sm sm:text-base font-semibold">{value}</p>
  </div>
);

export default WeatherDisplay;
