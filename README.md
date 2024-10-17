# Weather App

This is a Next.js-based weather application that provides real-time weather information, forecasts, and alerts for various locations.

## Features

- Current weather display
- 5-day forecast
- 24-hour hourly forecast
- Air quality index
- UV index
- Weather alerts
- City search with autocomplete suggestions
- Responsive design

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- OpenWeatherMap API for weather data

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd weather-app
npm install
```

Then, create a `.env` file in the root directory and add your OpenWeatherMap API key:

`API_KEY=your_openweathermap_api_key_here`

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000] with your browser to see the result.

## Project Structure

- `/app`: Contains the main application pages and layouts
- `/components`: React components used throughout the application
- `/lib`: Utility functions and API calls
- `/types`: TypeScript type definitions
- `/pages/api`: API routes for server-side operations

## API Integration

The application uses the OpenWeatherMap API to fetch weather data. API calls are managed in the `lib/api.ts` file.

## Styling

The project uses Tailwind CSS for styling, with custom configurations in `tailwind.config.ts`.
