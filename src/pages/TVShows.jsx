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

  // Mock data for hero carousel - in real app, this would come from API
  const featuredShows = [
    {
      id: 1,
      title: "Stranger Things",
      description:
        "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      rating: 8.7,
      year: "2016",
      seasons: 4,
      episodes: 42,
      genre: ["Drama", "Fantasy", "Horror"],
      backgroundImage: "/poster/Image (2).png",
      poster: "/poster/Image (2).png",
      trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    },
    {
      id: 2,
      title: "The Crown",
      description:
        "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
      rating: 8.6,
      year: "2016",
      seasons: 6,
      episodes: 60,
      genre: ["Drama", "History", "Biography"],
      backgroundImage: "/poster/Image (4).png",
      poster: "/poster/Image (4).png",
      trailer: "https://www.youtube.com/watch?v=JWtnJjn6ng0",
    },
    {
      id: 3,
      title: "Breaking Bad",
      description:
        "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
      rating: 9.5,
      year: "2008",
      seasons: 5,
      episodes: 62,
      genre: ["Crime", "Drama", "Thriller"],
      backgroundImage: "/poster/Image (6).png",
      poster: "/poster/Image (6).png",
      trailer: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    },
  ];

  // Mock data for all TV shows
  const allTVShows = [
    {
      id: 1,
      title: "Stranger Things",
      poster: "/poster/Image (2).png",
      rating: 8.7,
      year: "2016",
      seasons: 4,
      episodes: 42,
      genre: ["Drama", "Fantasy", "Horror"],
      isOngoing: false,
      quality: "4K",
      views: "2.1M",
    },
    {
      id: 2,
      title: "The Crown",
      poster: "/poster/Image (4).png",
      rating: 8.6,
      year: "2016",
      seasons: 6,
      episodes: 60,
      genre: ["Drama", "History", "Biography"],
      isOngoing: false,
      quality: "HD",
      views: "1.8M",
    },
    {
      id: 3,
      title: "Breaking Bad",
      poster: "/poster/Image (6).png",
      rating: 9.5,
      year: "2008",
      seasons: 5,
      episodes: 62,
      genre: ["Crime", "Drama", "Thriller"],
      isOngoing: false,
      quality: "4K",
      views: "3.2M",
    },
    {
      id: 4,
      title: "Game of Thrones",
      poster: "/poster/Image (8).png",
      rating: 9.3,
      year: "2011",
      seasons: 8,
      episodes: 73,
      genre: ["Action", "Adventure", "Drama"],
      isOngoing: false,
      quality: "4K",
      views: "4.1M",
    },
    {
      id: 5,
      title: "The Mandalorian",
      poster: "/poster/Image (10).png",
      rating: 8.7,
      year: "2019",
      seasons: 3,
      episodes: 24,
      genre: ["Action", "Adventure", "Sci-Fi"],
      isOngoing: true,
      quality: "4K",
      views: "2.8M",
    },
    {
      id: 6,
      title: "House of Cards",
      poster: "/poster/Image (12).png",
      rating: 8.7,
      year: "2013",
      seasons: 6,
      episodes: 73,
      genre: ["Drama", "Thriller"],
      isOngoing: false,
      quality: "HD",
      views: "1.9M",
    },
    {
      id: 7,
      title: "Money Heist",
      poster: "/poster/Image (14).png",
      rating: 8.3,
      year: "2017",
      seasons: 5,
      episodes: 41,
      genre: ["Action", "Crime", "Drama"],
      isOngoing: false,
      quality: "4K",
      views: "3.5M",
    },
    {
      id: 8,
      title: "The Witcher",
      poster: "/poster/Image (16).png",
      rating: 8.2,
      year: "2019",
      seasons: 3,
      episodes: 24,
      genre: ["Action", "Adventure", "Drama"],
      isOngoing: true,
      quality: "4K",
      views: "2.6M",
    },
    {
      id: 9,
      title: "Dark",
      poster: "/poster/Image (18).png",
      rating: 8.8,
      year: "2017",
      seasons: 3,
      episodes: 26,
      genre: ["Drama", "Mystery", "Sci-Fi"],
      isOngoing: false,
      quality: "HD",
      views: "1.7M",
    },
    {
      id: 10,
      title: "Ozark",
      poster: "/poster/Image (20).png",
      rating: 8.4,
      year: "2017",
      seasons: 4,
      episodes: 44,
      genre: ["Crime", "Drama", "Thriller"],
      isOngoing: false,
      quality: "4K",
      views: "2.3M",
    },
    {
      id: 11,
      title: "The Office",
      poster: "/poster/Image (22).png",
      rating: 9.0,
      year: "2005",
      seasons: 9,
      episodes: 201,
      genre: ["Comedy"],
      isOngoing: false,
      quality: "HD",
      views: "5.1M",
    },
    {
      id: 12,
      title: "Friends",
      poster: "/poster/Image (24).png",
      rating: 8.9,
      year: "1994",
      seasons: 10,
      episodes: 236,
      genre: ["Comedy", "Romance"],
      isOngoing: false,
      quality: "HD",
      views: "6.2M",
    },
  ];

  const genres = [
    "all",
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
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
        <motion.div variants={itemVariants}>
          <TVShowsHero shows={featuredShows} onShowClick={handleShowClick} />
        </motion.div>

        {/* Content */}
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
              Showing {filteredShows.length} of {allTVShows.length} TV shows
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

          {/* Empty State */}
          {filteredShows.length === 0 && (
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
      </motion.div>
    </div>
  );
};

export default TVShows;
