import React from "react";
import { motion } from "framer-motion";
import { Star, Play, Plus } from "lucide-react";

const RecommendedForYou = () => {
  const recommendations = [
    {
      id: 1,
      title: "The Menu",
      type: "Movie",
      rating: 4.6,
      year: 2022,
      genre: "Thriller",
      description: "A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu.",
      image: "/poster/Image (15).png",
      matchPercentage: 96
    },
    {
      id: 2,
      title: "Abbott Elementary",
      type: "TV Show",
      rating: 4.7,
      year: 2021,
      genre: "Comedy",
      description: "A workplace mockumentary about the daily lives of teachers in an underfunded Philadelphia elementary school.",
      image: "/poster/Image (16).png",
      matchPercentage: 93
    }
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">
          Recommended For You
        </h2>
        <motion.button 
          className="text-[#af3494] hover:text-purple-400 font-medium text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Refresh
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex space-x-4 group cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x112/374151/9CA3AF?text=No+Image";
                }}
              />
              
              {/* Match Percentage */}
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                {item.matchPercentage}% Match
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-white truncate text-sm">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                    <span>•</span>
                    <span>{item.genre}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-400">
                    {item.rating}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center space-x-2">
                <motion.button 
                  className="flex items-center space-x-2 bg-[#af3494] hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-3 h-3" />
                  <span>Watch Now</span>
                </motion.button>
                <motion.button 
                  className="flex items-center space-x-2 border border-gray-600 text-gray-300 hover:bg-gray-800 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-3 h-3" />
                  <span>Add to List</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedForYou;
