import React, { useState } from "react";
import { WeatherData } from "../types/weather";
import { FaTrash, FaBars, FaTimes } from "react-icons/fa";

interface SavedCitiesListProps {
  locations: WeatherData[];
  onSelectCity: (index: number) => void;
  onRemoveLocation: (index: number) => void;
  selectedIndex: number | null;
}

export const SavedCitiesList: React.FC<SavedCitiesListProps> = ({
  locations,
  onSelectCity,
  onRemoveLocation,
  selectedIndex,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`
        bg-gray-800 rounded-lg transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64 p-4" : "w-12 p-2"}
      `}
    >
      <div
        className={`
        flex justify-between items-center
        ${isExpanded ? "mb-4" : ""}
      `}
      >
        {isExpanded && <h2 className="text-xl font-semibold">Saved Cities</h2>}
        <button
          onClick={toggleExpand}
          className="text-white hover:text-gray-300 transition-colors duration-200 p-1 ml-auto"
        >
          {isExpanded ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      {isExpanded && (
        <ul>
          {locations.map((location, index) => (
            <li
              key={`${location.name}-${index}`}
              className={`flex justify-between items-center cursor-pointer hover:bg-gray-700 p-2 rounded mb-2 ${
                selectedIndex === index ? "bg-gray-700" : ""
              }`}
            >
              <span
                onClick={() => onSelectCity(index)}
                className="flex-grow truncate"
              >
                {location.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveLocation(index);
                }}
                className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
