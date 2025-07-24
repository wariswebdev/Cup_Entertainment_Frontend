import React from "react";
import { motion } from "framer-motion";
import { X, Filter } from "lucide-react";

const MoviesFilter = ({
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  movies,
}) => {
  // Extract unique genres from movies
  const genres = [
    "all",
    ...new Set(movies.map((movie) => movie.category).filter(Boolean)),
  ];

  const sortOptions = [
    { value: "latest", label: "Latest Release" },
    { value: "oldest", label: "Oldest Release" },
    { value: "name", label: "Alphabetical" },
    { value: "rating", label: "Highest Rated" },
  ];

  const clearFilters = () => {
    setSelectedGenre("all");
    setSortBy("latest");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <h3 className="text-white font-medium">Filters</h3>
        </div>

        <button
          onClick={clearFilters}
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          <span className="text-sm">Clear</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Genre
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === genre
                    ? "bg-[#af3494] text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {genre === "all" ? "All Genres" : genre}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] border border-gray-600"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedGenre !== "all" || sortBy !== "latest") && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Active filters:</span>

          {selectedGenre !== "all" && (
            <motion.span
              className="flex items-center space-x-1 px-2 py-1 bg-[#af3494]/20 text-[#af3494] rounded-md text-xs"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>Genre: {selectedGenre}</span>
              <button
                onClick={() => setSelectedGenre("all")}
                className="hover:bg-[#af3494]/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          )}

          {sortBy !== "latest" && (
            <motion.span
              className="flex items-center space-x-1 px-2 py-1 bg-[#af3494]/20 text-[#af3494] rounded-md text-xs"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>
                Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}
              </span>
              <button
                onClick={() => setSortBy("latest")}
                className="hover:bg-[#af3494]/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesFilter;
