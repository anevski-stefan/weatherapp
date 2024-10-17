import { useState, useEffect } from "react";
import axios from "axios";

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
      description: string;
    }[];
  }[];
}

interface ForecastProps {
  city: string;
}

export default function Forecast({ city }: ForecastProps) {
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get<ForecastData>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=YOUR_API_KEY`
        );
        setForecast(response.data);
      } catch (err) {
        console.error("Error fetching forecast:", err);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  if (!forecast) return null;

  const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-4">
        {dailyForecast.map((day) => (
          <div key={day.dt} className="text-center">
            <p>
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="mx-auto"
            />
            <p className="font-semibold">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
