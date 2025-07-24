import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Info,
  Star,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Heart,
} from "lucide-react";

const MoviesHero = ({ movies, loading }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || loading || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, movies.length, loading]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading || movies.length === 0) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-b from-gray-900 to-[#141414] animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading featured movies...</div>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentSlide];

  return (
    <div
      className="relative h-[70vh] overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                currentMovie.poster ||
                "https://via.placeholder.com/1920x1080/333/666?text=Movie+Poster"
              })`,
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 lg:px-8">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Badge */}
              <motion.div
                className="inline-flex items-center px-3 py-1 bg-[#af3494]/20 border border-[#af3494]/30 rounded-full text-[#af3494] text-sm font-medium mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentMovie.category || "Movie"}
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentMovie.title}
              </motion.h1>

              {/* Movie Info */}
              <motion.div
                className="flex items-center space-x-4 text-gray-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {currentMovie.imdbRating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">
                      {currentMovie.imdbRating}
                    </span>
                  </div>
                )}

                {currentMovie.releaseDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(currentMovie.releaseDate).getFullYear()}
                    </span>
                  </div>
                )}

                {currentMovie.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentMovie.duration}</span>
                  </div>
                )}

                <div className="px-2 py-1 bg-gray-700/50 rounded text-xs">
                  {currentMovie.quality || "HD"}
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-gray-300 text-lg mb-6 line-clamp-3 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {currentMovie.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    navigate(
                      `/dashboard/watch?type=movie&id=${currentMovie.id}`
                    )
                  }
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Play Now</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-2 bg-gray-700/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    navigate(`/dashboard/movie/${currentMovie.id}`)
                  }
                >
                  <Info className="w-5 h-5" />
                  <span>More Info</span>
                </motion.button>

                <motion.button
                  className="p-3 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.button>

                <motion.button
                  className="p-3 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <motion.div
          className="h-full bg-[#af3494]"
          initial={{ width: "0%" }}
          animate={{ width: autoPlay ? "100%" : "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </div>
    </div>
  );
};

export default MoviesHero;
