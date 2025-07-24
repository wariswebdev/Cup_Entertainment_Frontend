import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Star, Eye, Heart, Plus, Info, Calendar } from "lucide-react";

const TVShowCard = ({ show, onClick }) => {
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

  const handleMoreInfo = (e) => {
    e.stopPropagation();
    onClick(show);
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(show)}
      layout
    >
      {/* Card Container */}
      <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300">
        {/* Poster Image */}
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

          {/* Status Badge */}
          {show.isOngoing && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              Ongoing
            </div>
          )}

          {/* Quality Badge */}
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {show.quality}
          </div>

          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="bg-[#af3494] hover:bg-[#9c2d84] text-white p-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick(show);
              }}
            >
              <Play className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="absolute bottom-2 left-2 right-2 flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex space-x-2">
              <motion.button
                onClick={handleWatchlistToggle}
                className={`p-2 rounded-full transition-colors ${
                  isInWatchlist
                    ? "bg-green-600 text-white"
                    : "bg-black/70 text-white hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={
                  isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
                }
              >
                <Plus className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite
                    ? "bg-red-600 text-white"
                    : "bg-black/70 text-white hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={
                  isFavorite ? "Remove from Favorites" : "Add to Favorites"
                }
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                />
              </motion.button>
            </div>

            <motion.button
              onClick={handleMoreInfo}
              className="p-2 rounded-full bg-black/70 text-white hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="More Info"
            >
              <Info className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Show Info */}
        <div className="p-3">
          <h3
            className="text-white font-semibold text-sm mb-1 truncate"
            title={show.title}
          >
            {show.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{show.year}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span>{show.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>
              {show.seasons} season{show.seasons !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{show.views}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-2">
            {show.genre.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
              >
                {genre}
              </span>
            ))}
            {show.genre.length > 2 && (
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                +{show.genre.length - 2}
              </span>
            )}
          </div>

          {/* Episode Count */}
          <div className="text-xs text-gray-500">{show.episodes} episodes</div>
        </div>

        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-[#af3494] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      {/* Enhanced Hover Card */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-[#1a1a1a] border border-gray-600 rounded-lg shadow-2xl z-50 pointer-events-none"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.2 }}
        style={{ display: isHovered ? "block" : "none" }}
      >
        <div className="p-4">
          <h3 className="text-white font-bold text-base mb-2">{show.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{show.rating}</span>
            </div>
            <span>{show.year}</span>
            <span>{show.seasons}S</span>
            <span>{show.episodes}E</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {show.genre.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TVShowCard;
