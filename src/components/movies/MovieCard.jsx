import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Plus,
  Heart,
  Star,
  Clock,
  Calendar,
  Info,
  MoreHorizontal,
} from "lucide-react";

const MovieCard = ({ movie, viewMode = "grid", onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    setIsInWatchlist(!isInWatchlist);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    // Navigate to watch page
    window.location.href = `/dashboard/watch?type=movie&id=${movie.id}`;
  };

  if (viewMode === "list") {
    return (
      <motion.div
        className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer group"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-4">
          {/* Poster */}
          <div className="w-16 h-24 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
            <img
              src={
                movie.poster ||
                "https://via.placeholder.com/300x400/374151/9CA3AF?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x400/374151/9CA3AF?text=No+Image";
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg truncate group-hover:text-[#af3494] transition-colors">
              {movie.title}
            </h3>

            <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
              {movie.releaseDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(movie.releaseDate).getFullYear()}</span>
                </div>
              )}

              {movie.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{movie.duration}</span>
                </div>
              )}

              {movie.imdbRating && (
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{movie.imdbRating}</span>
                </div>
              )}
            </div>

            <p className="text-gray-300 text-sm mt-2 line-clamp-2">
              {movie.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-[#af3494]/20 text-[#af3494] text-xs rounded-full">
                  {movie.category}
                </span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                  {movie.quality || "HD"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  onClick={handlePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-4 h-4" />
                </motion.button>

                <motion.button
                  className={`p-2 transition-colors ${
                    isInWatchlist
                      ? "text-[#af3494]"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={handleWatchlistToggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>

                <motion.button
                  className={`p-2 transition-colors ${
                    isFavorite
                      ? "text-red-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={handleFavoriteToggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      className="group cursor-pointer"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        {/* Poster Image */}
        <img
          src={
            movie.poster ||
            "https://via.placeholder.com/300x400/374151/9CA3AF?text=No+Image"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400/374151/9CA3AF?text=No+Image";
          }}
        />

        {/* Quality Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-md backdrop-blur-sm">
          {movie.quality || "HD"}
        </div>

        {/* Rating Badge */}
        {movie.imdbRating && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 bg-black/70 text-white text-xs rounded-md backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{movie.imdbRating}</span>
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <motion.button
              className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
              onClick={handlePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
            >
              <Play className="w-5 h-5 fill-current" />
            </motion.button>

            <motion.button
              className={`p-3 rounded-full transition-colors ${
                isInWatchlist
                  ? "bg-[#af3494] text-white"
                  : "bg-gray-700/70 text-white hover:bg-gray-600"
              } backdrop-blur-sm`}
              onClick={handleWatchlistToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.15 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>

            <motion.button
              className={`p-3 rounded-full transition-colors ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-gray-700/70 text-white hover:bg-gray-600"
              } backdrop-blur-sm`}
              onClick={handleFavoriteToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </motion.button>

            <motion.button
              className="p-3 bg-gray-700/70 text-white rounded-full hover:bg-gray-600 transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.25 }}
            >
              <Info className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-sm truncate mb-1">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              {movie.releaseDate && (
                <span>{new Date(movie.releaseDate).getFullYear()}</span>
              )}
              {movie.duration && (
                <>
                  <span>•</span>
                  <span>{movie.duration}</span>
                </>
              )}
            </div>

            <span className="px-2 py-1 bg-[#af3494]/20 text-[#af3494] rounded-full text-xs">
              {movie.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
