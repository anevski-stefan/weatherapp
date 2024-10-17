export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  dt: number;
  coord: {
    lat: number;
    lon: number;
  };
  airQuality: number | null;
  forecast: ForecastData | null;
  uvIndex: number | null;
  alerts: AlertData[];
}
  
  export interface ForecastData {
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

  export interface AlertData {
    sender_name: string;
    event: string;
    start: number;
    description: string;
    tags: string[];
  }
  export interface ForecastItem {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }