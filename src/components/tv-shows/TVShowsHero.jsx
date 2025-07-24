import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  Volume2,
} from "lucide-react";

const TVShowsHero = ({ shows, onShowClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shows.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [shows.length, autoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % shows.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + shows.length) % shows.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const currentShow = shows[currentIndex];

  const handleWatchNow = () => {
    onShowClick(currentShow);
  };

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={currentShow.backgroundImage}
            alt={currentShow.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentShow.title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-4 text-sm mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{currentShow.rating}</span>
                </div>
                <span>{currentShow.year}</span>
                <span>{currentShow.seasons} seasons</span>
                <span>{currentShow.episodes} episodes</span>
                <div className="flex flex-wrap gap-1">
                  {currentShow.genre.slice(0, 3).map((g, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.p
                className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {currentShow.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.button
                  onClick={handleWatchNow}
                  className="flex items-center space-x-2 bg-[#af3494] hover:bg-[#9c2d84] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6" />
                  <span>Watch Now</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Volume2 className="w-6 h-6" />
                  <span>Trailer</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Info className="w-6 h-6" />
                  <span>More Info</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Poster */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <img
                  src={currentShow.poster}
                  alt={currentShow.title}
                  className="w-80 h-auto object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {shows.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setAutoPlay(false);
              setTimeout(() => setAutoPlay(true), 10000);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-[#af3494]"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-[#af3494]"
          initial={{ width: 0 }}
          animate={{ width: autoPlay ? "100%" : "0%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={currentIndex}
        />
      </div>
    </div>
  );
};

export default TVShowsHero;
