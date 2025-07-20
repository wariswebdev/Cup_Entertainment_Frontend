import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Play,
  Plus,
} from "lucide-react";

const TrendingContent = () => {
  const scrollRef = useRef(null);

  const trendingItems = [
    {
      id: 1,
      title: "Wednesday",
      type: "TV Show",
      rank: 1,
      image: "/poster/Image (19).png",
      category: "Mystery",
    },
    {
      id: 2,
      title: "Avatar: The Way of Water",
      type: "Movie",
      rank: 2,
      image: "/poster/Image (20).png",
      category: "Sci-Fi",
    },
    {
      id: 3,
      title: "House of the Dragon",
      type: "TV Show",
      rank: 3,
      image: "/poster/Image (21).png",
      category: "Fantasy",
    },
    {
      id: 4,
      title: "Top Gun: Maverick",
      type: "Movie",
      rank: 4,
      image: "/poster/Image (22).png",
      category: "Action",
    },
    {
      id: 5,
      title: "Stranger Things",
      type: "TV Show",
      rank: 5,
      image: "/poster/Image (23).png",
      category: "Sci-Fi",
    },
    {
      id: 6,
      title: "The Batman",
      type: "Movie",
      rank: 6,
      image: "/poster/Image (24).png",
      category: "Action",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-white">Trending Now</h2>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {trendingItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="group cursor-pointer flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-32 aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/128x171/374151/9CA3AF?text=No+Image";
                }}
              />

              {/* Ranking Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                #{item.rank}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-3 h-3 text-gray-900 ml-0.5" />
                  </motion.button>
                  <motion.button
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-white truncate text-sm">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{item.type}</span>
                <span>{item.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingContent;
