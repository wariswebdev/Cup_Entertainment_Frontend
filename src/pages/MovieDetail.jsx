import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Plus,
  Heart,
  Share2,
  Star,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Download,
  ThumbsUp,
  ThumbsDown,
  Check,
} from "lucide-react";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import MovieCast from "../components/movies/MovieCast";
import SimilarMovies from "../components/movies/SimilarMovies";
import { movieService } from "../services/firebaseServices";
import { useMovies } from "../hooks/useMovies";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies } = useMovies();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const movieData = await movieService.getMovieById(id);
        if (movieData) {
          setMovie(movieData);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Error loading movie details");
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    // TODO: Implement watchlist API call
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorites API call
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    // TODO: Implement rating API call
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex">
        <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          } flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#af3494] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#141414] flex">
        <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          } flex items-center justify-center`}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {error || "Movie not found"}
            </h2>
            <button
              onClick={() => navigate("/dashboard/movies")}
              className="text-[#af3494] hover:text-purple-400 font-medium"
            >
              ← Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get similar movies based on category
  const similarMovies = movies
    .filter((m) => m.id !== movie.id && m.category === movie.category)
    .slice(0, 6);

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
        {/* Hero Section */}
        <motion.div
          className="relative h-[70vh] overflow-hidden"
          variants={itemVariants}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                movie.poster ||
                "https://via.placeholder.com/1920x1080/333/666?text=Movie+Poster"
              })`,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]" />

          {/* Back Button */}
          <motion.button
            className="absolute top-6 left-6 z-20 flex items-center space-x-2 px-4 py-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors backdrop-blur-sm"
            onClick={() => navigate("/dashboard/movies")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Movies</span>
          </motion.button>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <motion.div
                className="inline-flex items-center px-3 py-1 bg-[#af3494]/20 border border-[#af3494]/30 rounded-full text-[#af3494] text-sm font-medium mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {movie.category || "Movie"}
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {movie.title}
              </motion.h1>

              {/* Movie Info */}
              <motion.div
                className="flex flex-wrap items-center gap-4 text-gray-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {movie.imdbRating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{movie.imdbRating}</span>
                  </div>
                )}

                {movie.releaseDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                )}

                {movie.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                )}

                <div className="px-3 py-1 bg-gray-700/50 rounded-md text-sm">
                  {movie.quality || "HD"}
                </div>

                {movie.language && (
                  <div className="px-3 py-1 bg-gray-700/50 rounded-md text-sm">
                    {Array.isArray(movie.language)
                      ? movie.language.join(", ")
                      : movie.language}
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-gray-300 text-lg mb-8 max-w-3xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {movie.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    navigate(`/dashboard/watch?type=movie&id=${movie.id}`)
                  }
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Play Now</span>
                </motion.button>

                <motion.button
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isInWatchlist
                      ? "bg-[#af3494] text-white"
                      : "bg-gray-700/50 text-white hover:bg-gray-700"
                  } backdrop-blur-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWatchlistToggle}
                >
                  {isInWatchlist ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  <span>
                    {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                  </span>
                </motion.button>

                <motion.button
                  className={`p-3 rounded-lg transition-colors ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-gray-700/50 text-white hover:bg-gray-700"
                  } backdrop-blur-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavoriteToggle}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </motion.button>

                <motion.button
                  className="p-3 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>

                <motion.button
                  className="p-3 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="px-6 py-8 space-y-8 max-w-[calc(100vw-4rem)] overflow-x-hidden">
          {/* Movie Details */}
          <motion.div
            className="bg-gray-800/50 rounded-xl p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Movie Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movie.director && (
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">
                    Director
                  </h3>
                  <p className="text-white">{movie.director}</p>
                </div>
              )}

              {movie.cast && (
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">
                    Cast
                  </h3>
                  <p className="text-white">
                    {Array.isArray(movie.cast)
                      ? movie.cast.join(", ")
                      : movie.cast}
                  </p>
                </div>
              )}

              {movie.releaseDate && (
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">
                    Release Date
                  </h3>
                  <p className="text-white">
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {movie.status && (
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">
                    Status
                  </h3>
                  <p className="text-white">{movie.status}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* User Rating */}
          <motion.div
            className="bg-gray-800/50 rounded-xl p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Rate This Movie
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ThumbsUp
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    userRating === "up"
                      ? "text-green-500 fill-current"
                      : "text-gray-400 hover:text-green-400"
                  }`}
                  onClick={() =>
                    handleRating(userRating === "up" ? null : "up")
                  }
                />
                <ThumbsDown
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    userRating === "down"
                      ? "text-red-500 fill-current"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                  onClick={() =>
                    handleRating(userRating === "down" ? null : "down")
                  }
                />
              </div>

              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 cursor-pointer transition-colors text-gray-400 hover:text-yellow-400"
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cast */}
          {movie.cast && (
            <motion.div variants={itemVariants}>
              <MovieCast cast={movie.cast} />
            </motion.div>
          )}

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <motion.div variants={itemVariants}>
              <SimilarMovies movies={similarMovies} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MovieDetail;
