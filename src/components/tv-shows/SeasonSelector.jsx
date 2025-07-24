import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

const SeasonSelector = ({ seasons, selectedSeason, onSeasonChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSeasonSelect = (seasonNumber) => {
    onSeasonChange(seasonNumber);
    setIsOpen(false);
  };

  const currentSeason = seasons.find((s) => s.season === selectedSeason);

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors min-w-[150px] justify-between"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-medium">Season {selectedSeason}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              className="absolute top-full right-0 mt-2 bg-[#1a1a1a] border border-gray-600 rounded-lg shadow-xl z-20 min-w-[200px] max-h-80 overflow-y-auto"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-2">
                {seasons.map((season) => (
                  <motion.button
                    key={season.season}
                    onClick={() => handleSeasonSelect(season.season)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-center justify-between ${
                      selectedSeason === season.season
                        ? "bg-gray-800 text-[#af3494]"
                        : "text-white"
                    }`}
                    whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                  >
                    <div>
                      <div className="font-medium">Season {season.season}</div>
                      <div className="text-sm text-gray-400">
                        {season.episodes} episodes • {season.year}
                      </div>
                    </div>
                    {selectedSeason === season.season && (
                      <Check className="w-4 h-4 text-[#af3494]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Season Info */}
      {currentSeason && (
        <motion.div
          className="mt-3 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selectedSeason}
        >
          {currentSeason.episodes} episodes • Released {currentSeason.year}
        </motion.div>
      )}
    </div>
  );
};

export default SeasonSelector;
