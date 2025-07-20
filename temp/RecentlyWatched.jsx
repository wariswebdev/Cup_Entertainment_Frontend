import React from "react";
import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";

const RecentlyWatched = () => {
  const recentItems = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      type: "Movie",
      rating: 4.8,
      watchedDate: "2024-01-15",
      image: "/poster/Image (5).png",
      duration: "3h 12m",
    },
    {
      id: 2,
      title: "House of the Dragon",
      type: "TV Show",
      episode: "S1 E10",
      rating: 4.6,
      watchedDate: "2024-01-14",
      image: "/poster/Image (6).png",
      duration: "1h 8m",
    },
    {
      id: 3,
      title: "Top Gun: Maverick",
      type: "Movie",
      rating: 4.9,
      watchedDate: "2024-01-13",
      image: "/poster/Image (7).png",
      duration: "2h 11m",
    },
    {
      id: 4,
      title: "The Bear",
      type: "TV Show",
      episode: "S2 E8",
      rating: 4.7,
      watchedDate: "2024-01-12",
      image: "/poster/Image (8).png",
      duration: "28m",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">Recently Watched</h2>
        <motion.button
          className="text-[#af3494] hover:text-purple-400 font-medium text-sm"
          whileHover={{ scale: 1.05 }}
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-3">
        {recentItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Thumbnail */}
            <div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/48x64/374151/9CA3AF?text=No+Image";
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white truncate text-sm">
                {item.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                <span>
                  {item.type}
                  {item.episode && ` • ${item.episode}`}
                </span>
                <span>•</span>
                <span>{item.duration}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-400">{item.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(item.watchedDate)}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              className="text-[#af3494] hover:text-purple-400 text-xs font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Again
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyWatched;
