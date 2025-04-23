# Weather Forecast Application

A modern, responsive weather forecast application built with Next.js, TypeScript, and Tailwind CSS. This application provides real-time weather data, forecasts, and various weather-related metrics using the OpenWeatherMap API.

## Features

- Real-time weather data display
- 5-day weather forecast
- 24-hour detailed forecast
- Air quality index monitoring
- UV index tracking
- Weather alerts system
- City search with autocomplete
- Saved cities management
- Responsive design
- Animated weather transitions
- Multiple location support

## Tech Stack

- **Frontend Framework**: Next.js 14.2.15
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **Animation**: Framer Motion 11.11.9
- **Icons**: React Icons 5.3.0
- **HTTP Client**: Axios 1.7.7
- **Font**: Geist (Variable Font)

## Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm
- OpenWeatherMap API key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weatherapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
API_KEY=your_openweathermap_api_key
```

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Runs the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code linting

## Dependencies

### Main Dependencies
- next: 14.2.15
- react: 18
- react-dom: 18
- axios: 1.7.7
- framer-motion: 11.11.9
- react-icons: 5.3.0

### Dev Dependencies
- typescript: 5
- tailwindcss: 3.4.1
- eslint: 8
- postcss: 8
- @types/react: 18
- @types/node: 20

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.
