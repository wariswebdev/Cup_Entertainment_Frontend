import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react";

const SimilarShows = ({ shows, onShowClick }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const nextSlide = () => {
    if (startIndex + itemsPerPage < shows.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - itemsPerPage));
    }
  };

  const visibleShows = shows.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Similar Shows</h3>

        {/* Navigation Arrows */}
        {shows.length > itemsPerPage && (
          <div className="flex space-x-2">
            <motion.button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className={`p-2 rounded-full transition-colors ${
                startIndex === 0
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
              whileHover={startIndex > 0 ? { scale: 1.1 } : {}}
              whileTap={startIndex > 0 ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              disabled={startIndex + itemsPerPage >= shows.length}
              className={`p-2 rounded-full transition-colors ${
                startIndex + itemsPerPage >= shows.length
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
              whileHover={
                startIndex + itemsPerPage < shows.length ? { scale: 1.1 } : {}
              }
              whileTap={
                startIndex + itemsPerPage < shows.length ? { scale: 0.9 } : {}
              }
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleShows.map((show, index) => (
          <motion.div
            key={show.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onShowClick(show)}
          >
            {/* Show Card */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300">
              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={show.poster}
                  alt={show.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    className="bg-[#af3494] hover:bg-[#9c2d84] text-white p-3 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowClick(show);
                    }}
                  >
                    <Play className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                {/* Rating */}
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium">{show.rating}</span>
                </div>
              </div>

              {/* Show Info */}
              <div className="p-3">
                <h4 className="text-white font-semibold text-sm mb-1 truncate group-hover:text-purple-400 transition-colors">
                  {show.title}
                </h4>
                <p className="text-gray-400 text-xs">{show.year}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      {shows.length > itemsPerPage && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: Math.ceil(shows.length / itemsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index * itemsPerPage)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(startIndex / itemsPerPage) === index
                    ? "w-8 bg-[#af3494]"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            )
          )}
        </div>
      )}

      {/* Show All Button */}
      <div className="text-center mt-6">
        <motion.button
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse All Shows
        </motion.button>
      </div>
    </div>
  );
};

export default SimilarShows;
