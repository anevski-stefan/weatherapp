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

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Font**: Geist (Variable Font)

## Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm
- OpenWeatherMap API key

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-app
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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
