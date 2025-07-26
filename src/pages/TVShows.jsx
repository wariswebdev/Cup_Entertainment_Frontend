import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Eye,
  Search,
  Filter,
  Grid,
  List,
  Heart,
  Plus,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import TVShowsHero from "../components/tv-shows/TVShowsHero";
import TVShowCard from "../components/tv-shows/TVShowCard";
import TVShowsFilter from "../components/tv-shows/TVShowsFilter";
import { useTVShows } from "../hooks/useTVShows";

const TVShows = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const { tvShows, loading, error } = useTVShows();

  // Transform API data to component format
  const transformTVShowData = (apiTvShow) => {
    // Parse the year from firstAired date safely
    let year = "2024"; // Default year
    if (apiTvShow.firstAired) {
      try {
        const date = new Date(apiTvShow.firstAired);
        if (!isNaN(date.getTime())) {
          year = date.getFullYear().toString();
        }
      } catch (error) {
        console.warn("Invalid date format for TV show:", apiTvShow.title);
      }
    }

    return {
      id: apiTvShow.id,
      title: apiTvShow.title,
      description: apiTvShow.description,
      poster: apiTvShow.posterUrl || "/poster/Image (1).png", // fallback poster
      backgroundImage: apiTvShow.posterUrl || "/poster/Image (1).png",
      rating: 8.5, // Default rating since not in API response
      year: year,
      seasons: apiTvShow.totalSeasons || 1,
      episodes: apiTvShow.totalEpisodes || 10,
      genre: apiTvShow.genre || [],
      isOngoing: apiTvShow.status === "Ongoing",
      quality: "4K", // Default quality
      views: "1.0M", // Default views
      trailer: apiTvShow.trailerUrl,
      network: apiTvShow.network || "Unknown",
      status: apiTvShow.status || "Unknown",
      createdAt: apiTvShow.createdAt,
      updatedAt: apiTvShow.updatedAt,
    };
  };

  // Transform API data for use in components
  const transformedTVShows = Array.isArray(tvShows)
    ? tvShows.map(transformTVShowData)
    : [];

  // Use first 3 shows for featured carousel
  const featuredShows = transformedTVShows.slice(0, 3);

  // Use all shows for the main grid
  const allTVShows = transformedTVShows;

  // Extract unique genres from API data
  const genres = [
    "all",
    ...new Set(
      transformedTVShows.flatMap((show) => show.genre).filter(Boolean)
    ),
  ];

  // Filter and sort TV shows
  const filteredShows = allTVShows
    .filter((show) => {
      if (
        searchTerm &&
        !show.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (selectedGenre !== "all" && !show.genre.includes(selectedGenre)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "year":
          return parseInt(b.year) - parseInt(a.year);
        case "views":
          return parseFloat(b.views) - parseFloat(a.views);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default: // latest
          return parseInt(b.year) - parseInt(a.year);
      }
    });

  const handleShowClick = (show) => {
    navigate(`/dashboard/tv-show/${show.id}`);
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
      <div className="min-h-screen bg-[#141414] flex overflow-x-hidden">
        <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <DashboardHeader />
          <div className="flex items-center justify-center h-64">
            <div className="text-white">Loading TV Shows...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#141414] flex overflow-x-hidden">
        <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <DashboardHeader />
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-400 mb-4">Error loading TV shows</div>
              <div className="text-gray-400">{error}</div>
            </div>
          </div>
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
        {/* Header */}
        <DashboardHeader />

        {/* Hero Section */}
        {featuredShows.length > 0 && (
          <motion.div variants={itemVariants}>
            <TVShowsHero shows={featuredShows} onShowClick={handleShowClick} />
          </motion.div>
        )}

        {/* Content */}
        {transformedTVShows.length > 0 && (
          <div className="px-4 py-6 space-y-6">
            {/* Search and Filters */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search TV shows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#af3494] text-white"
                      : "bg-[#1a1a1a] text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-[#af3494] text-white"
                      : "bg-[#1a1a1a] text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  variants={itemVariants}
                >
                  <TVShowsFilter
                    genres={genres}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Info */}
            <motion.div
              className="flex items-center justify-between text-gray-300"
              variants={itemVariants}
            >
              <p>
                Showing {filteredShows.length} of {transformedTVShows.length} TV
                shows
              </p>
              <div className="text-sm text-gray-400">Sorted by {sortBy}</div>
            </motion.div>

            {/* TV Shows Grid/List */}
            <motion.div variants={itemVariants}>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredShows.map((show, index) => (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TVShowCard
                        show={show}
                        onClick={() => handleShowClick(show)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredShows.map((show, index) => (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleShowClick(show)}
                      className="flex items-center space-x-4 p-4 bg-[#1a1a1a] rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <img
                        src={show.poster}
                        alt={show.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">
                          {show.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span>{show.year}</span>
                          <span>{show.seasons} seasons</span>
                          <span>{show.episodes} episodes</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{show.rating}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {show.genre.slice(0, 3).map((g, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{show.views}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Filtered Results Empty State */}
            {filteredShows.length === 0 && transformedTVShows.length > 0 && (
              <motion.div className="text-center py-12" variants={itemVariants}>
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No TV shows found
                  </h3>
                  <p>Try adjusting your search or filter criteria.</p>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Empty State */}
        {transformedTVShows.length === 0 && !loading && (
          <motion.div className="text-center py-12" variants={itemVariants}>
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No TV shows available
              </h3>
              <p>There are no TV shows in the database yet.</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TVShows;
