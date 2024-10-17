import React from "react";
import { WeatherData } from "../types/weather";
import { FaTrash } from "react-icons/fa";

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
  return (
    <div className="w-64 mr-8 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Saved Cities</h2>
      <ul>
        {locations.map((location, index) => (
          <li
            key={`${location.name}-${index}`}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-700 p-2 rounded mb-2 ${
              selectedIndex === index ? "bg-gray-700" : ""
            }`}
          >
            <span onClick={() => onSelectCity(index)} className="flex-grow">
              {location.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveLocation(index);
              }}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
