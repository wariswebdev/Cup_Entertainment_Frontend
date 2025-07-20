import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import RecentlyWatched from "../components/dashboard/RecentlyWatched";
import ContinueWatching from "../components/dashboard/ContinueWatching";
import MyWatchlist from "../components/dashboard/MyWatchlist";
import RecommendedForYou from "../components/dashboard/RecommendedForYou";
import TrendingContent from "../components/dashboard/TrendingContent";
import MyFavorites from "../components/dashboard/MyFavorites";
import WatchingStats from "../components/dashboard/WatchingStats";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#141414] flex overflow-x-hidden">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <motion.div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        } overflow-x-hidden`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <div className="px-4 py-6 space-y-6 max-w-[calc(100vw-4rem)] overflow-x-hidden">
          {/* Welcome Section */}
          <motion.div
            className="bg-gradient-to-r from-purple-600 via-[#af3494] to-purple-800 rounded-xl p-6 text-white relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="relative z-10">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                Welcome back to Cup Entertainment!
              </h1>
              <p className="text-purple-100 mb-4 text-sm lg:text-base">
                Continue your entertainment journey with personalized
                recommendations.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <motion.button
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore New Content
                </motion.button>
                <motion.button
                  className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Categories
                </motion.button>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <WatchingStats />
          </motion.div>

          {/* Continue Watching */}
          <motion.div variants={itemVariants}>
            <ContinueWatching />
          </motion.div>

          {/* Recently Watched */}
          <motion.div variants={itemVariants}>
            <RecentlyWatched />
          </motion.div>

          {/* My Watchlist */}
          <motion.div variants={itemVariants}>
            <MyWatchlist />
          </motion.div>

          {/* Recommended For You */}
          <motion.div variants={itemVariants}>
            <RecommendedForYou />
          </motion.div>

          {/* Trending Content */}
          <motion.div variants={itemVariants}>
            <TrendingContent />
          </motion.div>

          {/* My Favorites */}
          <motion.div variants={itemVariants}>
            <MyFavorites />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
