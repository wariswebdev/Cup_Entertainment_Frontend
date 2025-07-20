import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, Play } from "lucide-react";

const MyFavorites = () => {
  const favorites = [
    {
      id: 1,
      title: "Breaking Bad",
      type: "TV Show",
      rating: 4.9,
      year: 2008,
      genre: "Crime",
      image: "/poster/Image (27).png",
      addedDate: "2024-01-05"
    },
    {
      id: 2,
      title: "The Godfather",
      type: "Movie",
      rating: 4.8,
      year: 1972,
      genre: "Crime",
      image: "/poster/Image (28).png",
      addedDate: "2024-01-04"
    },
    {
      id: 3,
      title: "The Office",
      type: "TV Show",
      rating: 4.7,
      year: 2005,
      genre: "Comedy",
      image: "/poster/Image (1).png",
      addedDate: "2024-01-03"
    },
    {
      id: 4,
      title: "Inception",
      type: "Movie",
      rating: 4.8,
      year: 2010,
      genre: "Sci-Fi",
      image: "/poster/Image (2).png",
      addedDate: "2024-01-02"
    },
    {
      id: 5,
      title: "Game of Thrones",
      type: "TV Show",
      rating: 4.6,
      year: 2011,
      genre: "Fantasy",
      image: "/poster/Image (3).png",
      addedDate: "2024-01-01"
    },
    {
      id: 6,
      title: "Pulp Fiction",
      type: "Movie",
      rating: 4.7,
      year: 1994,
      genre: "Crime",
      image: "/poster/Image (4).png",
      addedDate: "2023-12-31"
    }
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
          <h2 className="text-lg font-semibold text-white">
            My Favorites ({favorites.length})
          </h2>
        </div>
        <motion.button 
          className="text-[#af3494] hover:text-purple-400 font-medium text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Manage Favorites
        </motion.button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {favorites.map((item, index) => (
          <motion.div
            key={item.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200x267/374151/9CA3AF?text=No+Image";
                }}
              />
              
              {/* Heart Icon */}
              <div className="absolute top-2 right-2">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.button 
                  className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-4 h-4 text-gray-900 ml-0.5" />
                </motion.button>
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 rounded px-2 py-1 flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-white font-medium">{item.rating}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-white truncate text-sm">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{item.type}</span>
                <span>{item.year}</span>
              </div>
              <p className="text-xs text-gray-500">
                {item.genre}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
