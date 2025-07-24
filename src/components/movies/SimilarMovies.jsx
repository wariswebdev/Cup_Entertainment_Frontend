import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Plus,
  Heart,
  Star,
} from "lucide-react";

const SimilarMovies = ({ movies }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const currentMovies = movies.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (!movies.length) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">More Like This</h2>

        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {totalPages}
            </span>

            <button
              onClick={nextPage}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentMovies.map((movie, index) => (
          <MovieCardSmall
            key={movie.id}
            movie={movie}
            index={index}
            onClick={() => navigate(`/dashboard/movie/${movie.id}`)}
          />
        ))}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#af3494] scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MovieCardSmall = ({ movie, index, onClick }) => {
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
    window.location.href = `/dashboard/watch?type=movie&id=${movie.id}`;
  };

  return (
    <motion.div
      className="group cursor-pointer"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2 }}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-700">
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
          <div className="flex items-center space-x-2">
            <motion.button
              className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
              onClick={handlePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
            >
              <Play className="w-4 h-4 fill-current" />
            </motion.button>

            <motion.button
              className={`p-2 rounded-full transition-colors ${
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
              <Plus className="w-3 h-3" />
            </motion.button>

            <motion.button
              className={`p-2 rounded-full transition-colors ${
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
                className={`w-3 h-3 ${isFavorite ? "fill-current" : ""}`}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-medium text-sm truncate mb-1">
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

export default SimilarMovies;
