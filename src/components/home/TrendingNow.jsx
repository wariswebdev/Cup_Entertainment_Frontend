import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";

const TrendingNow = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const trendingMovies = [
    {
      image: "Image (1).png",
      title: "CÓDIGO ALARUM",
      duration: "1h 50min",
      rating: 8.5,
    },
    {
      image: "Image (2).png",
      title: "ALONE IN VENICE",
      duration: "1h 37min",
      rating: 7.8,
    },
    {
      image: "Image (3).png",
      title: "MAGAZINE DREAMS",
      duration: "2h 4min",
      rating: 8.9,
    },
    {
      image: "Image (4).png",
      title: "MARSHMALLOW",
      duration: "2h 20min",
      rating: 9.2,
    },
    {
      image: "Image (5).png",
      title: "CHAPTERS OF VAMPIRES",
      duration: "1h 40min",
      rating: 8.4,
    },
    {
      image: "Image (6).png",
      title: "THE DARK KNIGHT",
      duration: "2h 32min",
      rating: 9.0,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Trending Now
          </h2>

          {/* Navigation Arrows - Hidden on mobile */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 lg:p-3 rounded-full transition-colors touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 lg:p-3 rounded-full transition-colors touch-manipulation"
            >
              <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>

        {/* Movies Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto md:overflow-hidden scroll-smooth pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trendingMovies.map((movie, index) => (
            <div
              key={index}
              className="group cursor-pointer flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72"
            >
              <div className="relative">
                {/* Movie Poster */}
                <div className="aspect-[2/3] rounded-lg overflow-hidden mb-3 transform transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={`/poster/${movie.image}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient overlay for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Movie Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-white text-sm sm:text-base truncate group-hover:text-purple-400 transition-colors">
                    {movie.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{movie.duration}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-medium">
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center space-x-2 mt-6 md:hidden">
          {[...Array(Math.ceil(trendingMovies.length / 3))].map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-600"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
