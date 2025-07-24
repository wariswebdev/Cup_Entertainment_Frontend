import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const TVShowsFilter = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
}) => {
  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "rating", label: "Highest Rated" },
    { value: "year", label: "Release Year" },
    { value: "views", label: "Most Viewed" },
    { value: "alphabetical", label: "A-Z" },
  ];

  const clearFilters = () => {
    setSelectedGenre("all");
    setSortBy("latest");
  };

  return (
    <motion.div
      className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Genres Filter */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-3">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === genre
                    ? "bg-[#af3494] text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
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
        <div className="md:w-64">
          <h3 className="text-white font-semibold mb-3">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <motion.button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedGenre !== "all" && (
          <motion.div
            className="flex items-center space-x-2 bg-[#af3494] text-white px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span>Genre: {selectedGenre}</span>
            <button
              onClick={() => setSelectedGenre("all")}
              className="hover:bg-white/20 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}

        {sortBy !== "latest" && (
          <motion.div
            className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span>
              Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}
            </span>
            <button
              onClick={() => setSortBy("latest")}
              className="hover:bg-white/20 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TVShowsFilter;
