import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Star,
  Calendar,
  Clock,
  Users,
  Heart,
  Plus,
  Share2,
  Download,
  ArrowLeft,
  ChevronDown,
  Check,
  Info,
  Volume2,
} from "lucide-react";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import EpisodeCard from "../components/tv-shows/EpisodeCard";
import SeasonSelector from "../components/tv-shows/SeasonSelector";
import TVShowCast from "../components/tv-shows/TVShowCast";
import SimilarShows from "../components/tv-shows/SimilarShows";

const TVShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  // Mock data - in real app, this would be fetched based on the ID
  const tvShow = {
    id: parseInt(id),
    title: "Stranger Things",
    description:
      "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back. Set in 1980s Indiana, this sci-fi horror series follows the investigation into Will Byers' disappearance and the supernatural events surrounding the small town of Hawkins.",
    rating: 8.7,
    year: "2016",
    totalSeasons: 4,
    totalEpisodes: 42,
    status: "Completed",
    genre: ["Drama", "Fantasy", "Horror", "Mystery", "Sci-Fi"],
    creator: ["The Duffer Brothers"],
    cast: [
      {
        name: "Millie Bobby Brown",
        character: "Eleven",
        image: "/poster/Image (1).png",
      },
      {
        name: "Finn Wolfhard",
        character: "Mike Wheeler",
        image: "/poster/Image (2).png",
      },
      {
        name: "David Harbour",
        character: "Jim Hopper",
        image: "/poster/Image (3).png",
      },
      {
        name: "Gaten Matarazzo",
        character: "Dustin Henderson",
        image: "/poster/Image (4).png",
      },
      {
        name: "Caleb McLaughlin",
        character: "Lucas Sinclair",
        image: "/poster/Image (5).png",
      },
      {
        name: "Noah Schnapp",
        character: "Will Byers",
        image: "/poster/Image (6).png",
      },
    ],
    network: "Netflix",
    language: ["English"],
    quality: "4K",
    poster: "/poster/Image (2).png",
    backgroundImage: "/poster/Image (2).png",
    trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    imdbRating: 8.7,
    rottenTomatoes: 93,
    metacritic: 76,
    views: "2.1M",
    lastEpisodeDate: "2022-07-01",
    seasons: [
      {
        season: 1,
        episodes: 8,
        year: "2016",
        episodes_list: [
          {
            episode: 1,
            title: "Chapter One: The Vanishing of Will Byers",
            description:
              "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
            duration: "47m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (7).png",
            watched: true,
            rating: 8.9,
          },
          {
            episode: 2,
            title: "Chapter Two: The Weirdo on Maple Street",
            description:
              "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
            duration: "55m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (8).png",
            watched: true,
            rating: 8.7,
          },
          {
            episode: 3,
            title: "Chapter Three: Holly, Jolly",
            description:
              "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
            duration: "51m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (9).png",
            watched: false,
            rating: 8.8,
          },
          {
            episode: 4,
            title: "Chapter Four: The Body",
            description:
              "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover. Nancy and Jonathan form an unlikely alliance.",
            duration: "50m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (10).png",
            watched: false,
            rating: 9.1,
          },
          {
            episode: 5,
            title: "Chapter Five: Dig Dug",
            description:
              "Hopper breaks into the lab while Nancy and Jonathan confront the force that took Will. The boys ask Mr. Clarke how to travel to another dimension.",
            duration: "52m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (11).png",
            watched: false,
            rating: 8.9,
          },
          {
            episode: 6,
            title: "Chapter Six: The Monster",
            description:
              "Nancy and Jonathan swap conspiracy theories with a frazzled Hopper. Eleven goes looking for the Demogorgon.",
            duration: "46m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (12).png",
            watched: false,
            rating: 8.8,
          },
          {
            episode: 7,
            title: "Chapter Seven: The Bathtub",
            description:
              "Eleven makes a powerful discovery about her past. Dr. Brenner seeks to redeem himself. Joyce and Hopper are led into the lab.",
            duration: "41m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (13).png",
            watched: false,
            rating: 9.0,
          },
          {
            episode: 8,
            title: "Chapter Eight: The Upside Down",
            description:
              "Dr. Brenner holds Hopper and Joyce for questioning while the boys wait with Eleven in the gym and Nancy and Jonathan set a trap.",
            duration: "54m",
            releaseDate: "2016-07-15",
            thumbnail: "/poster/Image (14).png",
            watched: false,
            rating: 9.2,
          },
        ],
      },
      {
        season: 2,
        episodes: 9,
        year: "2017",
        episodes_list: [
          {
            episode: 1,
            title: "Chapter One: MADMAX",
            description:
              "As the town preps for Halloween, a high-scoring rival shakes things up in the arcade, and a skeptical Hopper inspects a field of rotting pumpkins.",
            duration: "48m",
            releaseDate: "2017-10-27",
            thumbnail: "/poster/Image (15).png",
            watched: false,
            rating: 8.5,
          },
          {
            episode: 2,
            title: "Chapter Two: Trick or Treat, Freak",
            description:
              "After Will sees something terrible on trick-or-treat night, Mike wonders whether Eleven's still out there. Nancy wrestles with the truth about Barb.",
            duration: "56m",
            releaseDate: "2017-10-27",
            thumbnail: "/poster/Image (16).png",
            watched: false,
            rating: 8.7,
          },
          // Add more episodes...
        ],
      },
    ],
  };

  // Similar shows data
  const similarShows = [
    {
      id: 2,
      title: "Dark",
      poster: "/poster/Image (18).png",
      rating: 8.8,
      year: "2017",
    },
    {
      id: 3,
      title: "The Umbrella Academy",
      poster: "/poster/Image (20).png",
      rating: 8.0,
      year: "2019",
    },
    {
      id: 4,
      title: "Supernatural",
      poster: "/poster/Image (22).png",
      rating: 8.4,
      year: "2005",
    },
    {
      id: 5,
      title: "The X-Files",
      poster: "/poster/Image (24).png",
      rating: 8.7,
      year: "1993",
    },
  ];

  const currentSeason = tvShow.seasons.find((s) => s.season === selectedSeason);

  const handleEpisodeClick = (episode) => {
    navigate(
      `/dashboard/watch?type=show&id=${tvShow.id}&season=${selectedSeason}&episode=${episode.episode}`
    );
  };

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleTrailerPlay = () => {
    setShowTrailer(true);
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
        <motion.div
          className="relative h-[70vh] overflow-hidden"
          variants={itemVariants}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={tvShow.backgroundImage}
              alt={tvShow.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="p-6 md:p-8 lg:p-12 max-w-4xl">
              {/* Back Button */}
              <button
                onClick={() => navigate("/dashboard/tv-shows")}
                className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to TV Shows</span>
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={tvShow.poster}
                    alt={tvShow.title}
                    className="w-48 h-72 object-cover rounded-lg shadow-2xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {tvShow.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{tvShow.rating}</span>
                    </div>
                    <span>{tvShow.year}</span>
                    <span>{tvShow.totalSeasons} seasons</span>
                    <span>{tvShow.totalEpisodes} episodes</span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {tvShow.quality}
                    </span>
                    <span className="px-2 py-1 bg-green-600 rounded text-xs">
                      {tvShow.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tvShow.genre.map((g, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl">
                    {showFullDescription
                      ? tvShow.description
                      : `${tvShow.description.slice(0, 200)}...`}
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-purple-400 hover:text-purple-300 ml-2"
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      className="flex items-center space-x-2 bg-[#af3494] hover:bg-[#9c2d84] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleEpisodeClick(currentSeason?.episodes_list[0])
                      }
                    >
                      <Play className="w-5 h-5" />
                      <span>Watch Now</span>
                    </motion.button>

                    <motion.button
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTrailerPlay}
                    >
                      <Volume2 className="w-5 h-5" />
                      <span>Trailer</span>
                    </motion.button>

                    <motion.button
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                        isInWatchlist
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleWatchlistToggle}
                    >
                      {isInWatchlist ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                      <span>Watchlist</span>
                    </motion.button>

                    <motion.button
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                        isFavorite
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFavoriteToggle}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                      <span>Favorite</span>
                    </motion.button>

                    <motion.button
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="px-6 md:px-8 lg:px-12 py-8 space-y-8">
          {/* Episodes Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Episodes</h2>
                <SeasonSelector
                  seasons={tvShow.seasons}
                  selectedSeason={selectedSeason}
                  onSeasonChange={setSelectedSeason}
                />
              </div>

              <div className="space-y-4">
                {currentSeason?.episodes_list.map((episode, index) => (
                  <EpisodeCard
                    key={episode.episode}
                    episode={episode}
                    onClick={() => handleEpisodeClick(episode)}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cast Section */}
          <motion.div variants={itemVariants}>
            <TVShowCast cast={tvShow.cast} />
          </motion.div>

          {/* Show Details */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Info */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">
                  Show Details
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="text-gray-400">Created by:</span>
                    <span className="text-white ml-2">
                      {tvShow.creator.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Network:</span>
                    <span className="text-white ml-2">{tvShow.network}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Language:</span>
                    <span className="text-white ml-2">
                      {tvShow.language.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Views:</span>
                    <span className="text-white ml-2">{tvShow.views}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Episode:</span>
                    <span className="text-white ml-2">
                      {new Date(tvShow.lastEpisodeDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Genres:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {tvShow.genre.map((g, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Ratings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">IMDb</span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">
                        {tvShow.imdbRating}/10
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rotten Tomatoes</span>
                    <span className="text-white font-semibold">
                      {tvShow.rottenTomatoes}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Metacritic</span>
                    <span className="text-white font-semibold">
                      {tvShow.metacritic}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Similar Shows */}
          <motion.div variants={itemVariants}>
            <SimilarShows
              shows={similarShows}
              onShowClick={(show) => navigate(`/dashboard/tv-show/${show.id}`)}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              className="bg-[#1a1a1a] rounded-lg p-6 max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  {tvShow.title} - Official Trailer
                </h3>
                <button
                  onClick={() => setShowTrailer(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <p>Trailer would be embedded here</p>
                  <p className="text-sm text-gray-400 mt-2">{tvShow.trailer}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TVShowDetail;
