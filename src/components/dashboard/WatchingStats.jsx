import React from "react";
import { motion } from "framer-motion";
import { Clock, Film, Tv, Heart } from "lucide-react";

const WatchingStats = () => {
  const stats = [
    {
      title: "Hours Watched",
      value: "147",
      subtitle: "This month",
      icon: Clock,
      color: "from-blue-500 to-blue-600",
      change: "+12%"
    },
    {
      title: "Movies Completed",
      value: "23",
      subtitle: "This month",
      icon: Film,
      color: "from-green-500 to-green-600",
      change: "+8%"
    },
    {
      title: "TV Episodes",
      value: "89",
      subtitle: "This month",
      icon: Tv,
      color: "from-purple-500 to-purple-600",
      change: "+15%"
    },
    {
      title: "Favorites",
      value: "42",
      subtitle: "Total saved",
      icon: Heart,
      color: "from-red-500 to-red-600",
      change: "+3"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-200"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-green-400">
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-300 mb-1">
                {stat.title}
              </p>
              <p className="text-xs text-gray-500">
                {stat.subtitle}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default WatchingStats;
