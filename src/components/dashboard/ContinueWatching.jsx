import React from "react";
import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const ContinueWatching = () => {
  const continueWatchingItems = [
    {
      id: 1,
      title: "The Batman",
      type: "Movie",
      progress: 65,
      duration: "2h 56m",
      timeLeft: "1h 3m left",
      image: "/poster/Image (1).png",
      lastWatched: "2 hours ago",
    },
    {
      id: 2,
      title: "Stranger Things",
      type: "TV Show",
      episode: "S4 E7",
      progress: 23,
      duration: "1h 15m",
      timeLeft: "58m left",
      image: "/poster/Image (2).png",
      lastWatched: "Yesterday",
    },
    {
      id: 3,
      title: "Dune",
      type: "Movie",
      progress: 87,
      duration: "2h 35m",
      timeLeft: "20m left",
      image: "/poster/Image (3).png",
      lastWatched: "3 days ago",
    },
    {
      id: 4,
      title: "The Crown",
      type: "TV Show",
      episode: "S5 E3",
      progress: 45,
      duration: "58m",
      timeLeft: "32m left",
      image: "/poster/Image (4).png",
      lastWatched: "1 week ago",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">Continue Watching</h2>
        <motion.button
          className="text-[#af3494] hover:text-purple-400 font-medium text-sm"
          whileHover={{ scale: 1.05 }}
        >
          View All
        </motion.button>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {continueWatchingItems.map((item) => (
          <motion.div
            key={item.id}
            className="group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x400/374151/9CA3AF?text=No+Image";
                }}
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                  to={`/dashboard/watch?type=${
                    item.type === "Movie" ? "movie" : "show"
                  }`}
                >
                  <motion.button
                    className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-5 h-5 text-gray-900 ml-1" />
                  </motion.button>
                </Link>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                <div className="w-full bg-gray-600 rounded-full h-1 mb-1">
                  <motion.div
                    className="bg-[#af3494] h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
                <div className="flex items-center justify-between text-xs text-white">
                  <span>{item.timeLeft}</span>
                  <Clock className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-white truncate text-sm">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>
                  {item.type}
                  {item.episode && ` • ${item.episode}`}
                </span>
              </div>
              <p className="text-xs text-gray-500">{item.lastWatched}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContinueWatching;
