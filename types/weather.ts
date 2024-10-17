export interface WeatherData {
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      id: number;
      description: string;
      icon: string;
    }[];
    name: string;
    sys: {
      sunrise: number;
      sunset: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    coord: {
      lat: number;
      lon: number;
    };
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