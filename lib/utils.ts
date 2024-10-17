export const getBackgroundColor = (temperature: number) => {
  console.log("Getting background color for temperature:", temperature);
  if (temperature <= 0) return 'from-blue-700 to-blue-900';
  if (temperature <= 10) return 'from-blue-500 to-blue-700';
  if (temperature <= 20) return 'from-green-400 to-blue-500';
  if (temperature <= 30) return 'from-yellow-300 to-red-400';
  return 'from-red-500 to-red-700';
};

export const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
};

export const getUVIndexDescription = (uvIndex: number) => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};