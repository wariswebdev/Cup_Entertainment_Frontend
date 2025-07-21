import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Star,
  Calendar,
  Clock,
  Users,
  Play,
  Plus,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  Check,
  X,
} from "lucide-react";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import MediaPlayer from "../components/streaming/MediaPlayer";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get("type") || "movie"; // default to movie
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoSrc] = useState("/sample.mp4");
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(null);

  // Mock data based on content type
  const mockContentData = {
    movie: {
      id: 1,
      title: "The Batman",
      description:
        "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      duration: "2h 56m",
      releaseDate: "2022",
      rating: 7.8,
      genre: ["Action", "Crime", "Drama"],
      director: "Matt Reeves",
      cast: [
        "Robert Pattinson",
        "Zoë Kravitz",
        "Jeffrey Wright",
        "Colin Farrell",
      ],
      language: "English",
      quality: "4K",
      poster: "/poster/Image (1).png",
      backgroundImage: "/poster/Image (1).png",
      imdbRating: 7.8,
      rottenTomatoes: 85,
      metacritic: 72,
    },
    show: {
      id: 2,
      title: "Stranger Things",
      description:
        "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      totalSeasons: 4,
      totalEpisodes: 34,
      releaseDate: "2016",
      rating: 8.7,
      genre: ["Drama", "Fantasy", "Horror"],
      creator: "The Duffer Brothers",
      cast: [
        "Millie Bobby Brown",
        "Finn Wolfhard",
        "David Harbour",
        "Gaten Matarazzo",
      ],
      language: "English",
      quality: "4K",
      poster: "/poster/Image (2).png",
      backgroundImage: "/poster/Image (2).png",
      imdbRating: 8.7,
      rottenTomatoes: 93,
      metacritic: 76,
      seasons: [
        {
          season: 1,
          episodes: [
            {
              episode: 1,
              title: "Chapter One: The Vanishing of Will Byers",
              duration: "47m",
              watched: true,
            },
            {
              episode: 2,
              title: "Chapter Two: The Weirdo on Maple Street",
              duration: "55m",
              watched: true,
            },
            {
              episode: 3,
              title: "Chapter Three: Holly, Jolly",
              duration: "51m",
              watched: false,
            },
            {
              episode: 4,
              title: "Chapter Four: The Body",
              duration: "50m",
              watched: false,
            },
          ],
        },
        {
          season: 2,
          episodes: [
            {
              episode: 1,
              title: "Chapter One: MADMAX",
              duration: "48m",
              watched: false,
            },
            {
              episode: 2,
              title: "Chapter Two: Trick or Treat, Freak",
              duration: "56m",
              watched: false,
            },
          ],
        },
      ],
    },
  };

  const currentContent = mockContentData[contentType];

  // Fullscreen handler
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleEpisodeSelect = (seasonNum, episodeNum) => {
    setCurrentSeason(seasonNum);
    setCurrentEpisode(episodeNum);
  };

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
  };

  return (
    <div className="min-h-screen bg-[#070b0b] flex overflow-x-hidden">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        } overflow-x-hidden`}
      >
        {/* Media Player */}
        <div className={`${isFullscreen ? "fixed inset-0 z-50" : "relative mt-5"}`}>
          
          <div
            className={`${
              isFullscreen
                ? "w-full h-full bg-black"
                : "w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-transparent"
            } `}
          >

            <MediaPlayer
              src={videoSrc}
              isFullscreen={isFullscreen}
              onFullscreen={handleFullscreen}
              title={currentContent.title}
              description={currentContent.description}
            />
          </div>
        </div>

        {/* Content Details - Only show when not fullscreen */}
        {!isFullscreen && (
          <div className="px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto mt-65">
            {/* Content Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                {/* Poster and Main Info */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6 lg:mb-0">
                  <div className="flex-shrink-0">
                    <img
                      src={currentContent.poster}
                      alt={currentContent.title}
                      className="w-40 h-60 object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/160x240/374151/9CA3AF?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {currentContent.title}
                    </h1>

                    {contentType === "show" && (
                      <p className="text-lg text-purple-400 mb-2">
                        Season {currentSeason}, Episode {currentEpisode}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-300 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{currentContent.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{currentContent.releaseDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {contentType === "movie"
                            ? currentContent.duration
                            : `${currentContent.totalEpisodes} episodes`}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {currentContent.quality}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentContent.genre.map((g, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-900 bg-opacity-50 text-purple-300 rounded-full text-sm"
                        >
                          {g}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl">
                      {currentContent.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          isInWatchlist
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                        onClick={handleWatchlistToggle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isInWatchlist ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                        <span>
                          {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                        </span>
                      </motion.button>

                      <motion.button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          isFavorite
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                        onClick={handleFavoriteToggle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFavorite ? "fill-current" : ""
                          }`}
                        />
                        <span>
                          {isFavorite ? "Favorited" : "Add to Favorites"}
                        </span>
                      </motion.button>

                      <motion.button
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </motion.button>

                      <motion.button
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content-specific sections */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                {/* Episodes section for TV shows */}
                {contentType === "show" && currentContent.seasons && (
                  <motion.div
                    className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-white">
                        Episodes
                      </h2>
                      <select
                        value={currentSeason}
                        onChange={(e) =>
                          setCurrentSeason(Number(e.target.value))
                        }
                        className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                      >
                        {currentContent.seasons.map((season) => (
                          <option key={season.season} value={season.season}>
                            Season {season.season}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      {currentContent.seasons
                        .find((s) => s.season === currentSeason)
                        ?.episodes.map((episode) => (
                          <motion.div
                            key={episode.episode}
                            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-colors ${
                              episode.episode === currentEpisode
                                ? "bg-purple-900 bg-opacity-50 border border-purple-700"
                                : "bg-gray-800 hover:bg-gray-700"
                            }`}
                            onClick={() =>
                              handleEpisodeSelect(
                                currentSeason,
                                episode.episode
                              )
                            }
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                              {episode.watched ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Play className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-white truncate">
                                  {episode.episode}. {episode.title}
                                </h3>
                                <span className="text-sm text-gray-400 ml-2 flex-shrink-0">
                                  {episode.duration}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}

                {/* Cast and Crew */}
                <motion.div
                  className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-white mb-6">
                    {contentType === "movie" ? "Cast & Crew" : "Cast"}
                  </h2>

                  {contentType === "movie" && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-300 mb-2">
                        Director
                      </h3>
                      <p className="text-gray-400">{currentContent.director}</p>
                    </div>
                  )}

                  {contentType === "show" && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-300 mb-2">
                        Creator
                      </h3>
                      <p className="text-gray-400">{currentContent.creator}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium text-gray-300 mb-4">
                      Main Cast
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {currentContent.cast.map((actor, index) => (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Users className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-300 font-medium">
                            {actor}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Ratings */}
                <motion.div
                  className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Ratings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">IMDb</span>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">
                          {currentContent.imdbRating}/10
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Rotten Tomatoes</span>
                      <span className="text-white font-medium">
                        {currentContent.rottenTomatoes}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Metacritic</span>
                      <span className="text-white font-medium">
                        {currentContent.metacritic}/100
                      </span>
                    </div>
                  </div>

                  {/* User Rating */}
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <h4 className="text-md font-medium text-white mb-3">
                      Rate this {contentType}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          onClick={() => handleRating(star)}
                          className="p-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              userRating && star <= userRating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-500"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                    {userRating && (
                      <p className="text-sm text-gray-400 mt-2">
                        You rated this {userRating}/5 stars
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div
                  className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">Language:</span>
                      <span className="text-white ml-2">
                        {currentContent.language}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Quality:</span>
                      <span className="text-white ml-2">
                        {currentContent.quality}
                      </span>
                    </div>
                    {contentType === "show" && (
                      <>
                        <div>
                          <span className="text-gray-400">Total Seasons:</span>
                          <span className="text-white ml-2">
                            {currentContent.totalSeasons}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Episodes:</span>
                          <span className="text-white ml-2">
                            {currentContent.totalEpisodes}
                          </span>
                        </div>
                      </>
                    )}
                    <div>
                      <span className="text-gray-400">Genres:</span>
                      <div className="mt-1">
                        {currentContent.genre.map((g, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs mr-2 mb-1"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watch;
