import React from "react";
import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";

const DashboardHeader = () => {
  return (
    <motion.header
      className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search movies, TV shows, actors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg 
                         bg-gray-800 text-white text-sm
                         placeholder-gray-400
                         focus:ring-2 focus:ring-[#af3494] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3 ml-6">
          {/* Notifications */}
          <motion.button
            className="relative p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#af3494] rounded-full"></span>
          </motion.button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-[#af3494] rounded-full flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium text-white">JD</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
