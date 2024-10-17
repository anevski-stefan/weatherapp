import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSubmit: () => void;
  fetchSuggestions: (query: string) => Promise<string[]>;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  city,
  setCity,
  onSubmit,
  fetchSuggestions,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const justSelectedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getSuggestions = async () => {
      if (city.length > 2 && !justSelectedRef.current) {
        const data = await fetchSuggestions(city);
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    };

    getSuggestions();
    justSelectedRef.current = false;
  }, [city, fetchSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCity(suggestion);
    setSuggestions([]);
    try {
      onSubmit();
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
    justSelectedRef.current = true;
  };

  const handleBlur = () => {
    // Use setTimeout to allow click events on suggestions to fire before hiding them
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={handleBlur}
          ref={inputRef}
          placeholder="Enter city name"
          className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <FaSearch className="mr-2" />
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-800 rounded-lg mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
