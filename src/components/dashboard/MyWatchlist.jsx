import React from "react";
import { motion } from "framer-motion";
import { Plus, Bookmark, Star, Clock } from "lucide-react";

const MyWatchlist = () => {
  const watchlistItems = [
    {
      id: 1,
      title: "Oppenheimer",
      type: "Movie",
      rating: 4.7,
      duration: "3h",
      genre: "Biography",
      image: "/poster/Image (10).png",
      addedDate: "2024-01-10"
    },
    {
      id: 2,
      title: "The Last of Us",
      type: "TV Show",
      rating: 4.9,
      duration: "1h",
      genre: "Drama",
      image: "/poster/Image (11).png",
      addedDate: "2024-01-09"
    },
    {
      id: 3,
      title: "John Wick: Chapter 4",
      type: "Movie",
      rating: 4.6,
      duration: "2h 49m",
      genre: "Action",
      image: "/poster/Image (12).png",
      addedDate: "2024-01-08"
    },
    {
      id: 4,
      title: "Wednesday",
      type: "TV Show",
      rating: 4.5,
      duration: "50m",
      genre: "Mystery",
      image: "/poster/Image (13).png",
      addedDate: "2024-01-07"
    },
    {
      id: 5,
      title: "Spider-Man: Across the Spider-Verse",
      type: "Movie",
      rating: 4.8,
      duration: "2h 20m",
      genre: "Animation",
      image: "/poster/Image (14).png",
      addedDate: "2024-01-06"
    }
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <Bookmark className="w-5 h-5 text-[#af3494]" />
          <h2 className="text-lg font-semibold text-white">
            My Watchlist ({watchlistItems.length})
          </h2>
        </div>
        <motion.button 
          className="flex items-center space-x-2 text-[#af3494] hover:text-purple-400 font-medium text-sm"
          whileHover={{ scale: 1.05 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {watchlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400/374151/9CA3AF?text=No+Image";
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                {/* Rating */}
                <div className="flex items-center space-x-1 bg-black bg-opacity-50 rounded-full px-2 py-1 self-start">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-white font-medium">{item.rating}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <motion.button 
                    className="bg-[#af3494] hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Now
                  </motion.button>
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-colors">
                    <Bookmark className="w-3 h-3 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-white truncate text-sm">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{item.type} • {item.genre}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{item.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyWatchlist;
