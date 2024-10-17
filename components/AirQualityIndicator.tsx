import { motion } from "framer-motion";

interface AirQualityIndicatorProps {
  airQuality: number | null;
}

export const AirQualityIndicator: React.FC<AirQualityIndicatorProps> = ({
  airQuality,
}) => {
  const getAirQualityLabel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getAirQualityColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 150) return "bg-orange-500";
    if (aqi <= 200) return "bg-red-500";
    if (aqi <= 300) return "bg-purple-500";
    return "bg-red-900";
  };

  if (airQuality === null) return null;

  const label = getAirQualityLabel(airQuality);
  const color = getAirQualityColor(airQuality);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-50 p-3 rounded-lg shadow-md"
    >
      <span className="font-semibold">Air Quality</span>
      <div className="mt-1">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className={`h-2.5 rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${(airQuality / 500) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
      <p className="mt-1">
        {airQuality} - {label}
      </p>
    </motion.div>
  );
};
