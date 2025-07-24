import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Grid, List, Filter, Search, SlidersHorizontal } from "lucide-react";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import MoviesHero from "../components/movies/MoviesHero";
import MovieCard from "../components/movies/MovieCard";
import MoviesFilter from "../components/movies/MoviesFilter";
import { useMovies } from "../hooks/useMovies";

const Movies = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const { movies, loading, error } = useMovies();

  // Mock data for hero carousel - in real app, this would come from API
  const featuredMovies = movies.slice(0, 5);

  // Filter movies based on search and filters
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" ||
      movie.category?.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      case "oldest":
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      case "name":
        return a.title.localeCompare(b.title);
      case "rating":
        return (b.imdbRating || 0) - (a.imdbRating || 0);
      default:
        return 0;
    }
  });

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

  if (error) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

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
        <motion.div variants={itemVariants}>
          <MoviesHero movies={featuredMovies} loading={loading} />
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="px-4 py-6 space-y-4 max-w-[calc(100vw-4rem)] overflow-x-hidden"
          variants={itemVariants}
        >
          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-white">All Movies</h2>
              <span className="text-gray-400">
                ({sortedMovies.length} movies)
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] w-64"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showFilters
                    ? "bg-[#af3494] text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#af3494] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-[#af3494] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-800 rounded-lg p-4"
            >
              <MoviesFilter
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                sortBy={sortBy}
                setSortBy={setSortBy}
                movies={movies}
              />
            </motion.div>
          )}

          {/* Movies Grid/List */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg aspect-[2/3] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                  : "space-y-4"
              }
              variants={containerVariants}
            >
              {sortedMovies.map((movie, index) => (
                <motion.div key={movie.id} variants={itemVariants}>
                  <MovieCard
                    movie={movie}
                    viewMode={viewMode}
                    onClick={() => navigate(`/dashboard/movie/${movie.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!loading && sortedMovies.length === 0 && (
            <motion.div className="text-center py-12" variants={itemVariants}>
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Movies;
