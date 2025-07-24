import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Star, Clock, Check, Eye, Download } from "lucide-react";

const EpisodeCard = ({ episode, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="group relative bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 cursor-pointer border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex gap-4">
        {/* Episode Thumbnail */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-20 bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/128x80/374151/9CA3AF?text=Episode";
              }}
            />
          </div>

          {/* Play Button Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-[#af3494] text-white p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* Episode Number */}
          <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {episode.episode}
          </div>

          {/* Watched Status */}
          {episode.watched && (
            <div className="absolute top-1 right-1 bg-green-600 text-white p-1 rounded-full">
              <Check className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Episode Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors truncate pr-2">
              {episode.title}
            </h3>
            <div className="flex items-center space-x-1 text-yellow-400 flex-shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{episode.rating}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
            {episode.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{episode.duration}</span>
              </div>
              <span>{formatDate(episode.releaseDate)}</span>
            </div>

            {/* Quick Actions */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Download"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-4 h-4" />
              </motion.button>

              <motion.button
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Mark as watched"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Progress Bar (if partially watched) */}
          {episode.watchProgress && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Continue watching</span>
                <span>{Math.round(episode.watchProgress)}% complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-[#af3494] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${episode.watchProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-[#af3494] opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default EpisodeCard;
