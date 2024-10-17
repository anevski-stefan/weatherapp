import { FaSearch } from "react-icons/fa";

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSubmit: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  city,
  setCity,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
};
