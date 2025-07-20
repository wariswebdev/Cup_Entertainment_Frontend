import React from "react";
import { Search, Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import logoDark from "../assets/logo-dark.png";

const Home = () => {
  // Array of all poster images
  const posterImages = [
    "Image (1).png",
    "Image (2).png",
    "Image (3).png",
    "Image (4).png",
    "Image (5).png",
    "Image (6).png",
    "Image (7).png",
    "Image (8).png",
    "Image (9).png",
    "Image (10).png",
    "Image (11).png",
    "Image (12).png",
    "Image (13).png",
    "Image (14).png",
    "Image (15).png",
    "Image (16).png",
    "Image (17).png",
    "Image (18).png",
    "Image (19).png",
    "Image (20).png",
    "Image (21).png",
    "Image (22).png",
    "Image (23).png",
    "Image (24).png",
    "Image (25).png",
    "Image (26).png",
    "Image (27).png",
    "Image (28).png",
    "Image (15).png",
    "Image (20).png",
  ];

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 mb-3">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logoDark}
                alt="Cup Entertainment"
                className="h-8 md:h-10 w-auto"
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                Movies & Shows
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                Support
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                Subscriptions
              </a>
            </div>

            {/* Search and User Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-gray-300 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with All Poster Images */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Images Grid */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-1">
          {posterImages.map((image, index) => (
            <div key={index} className="aspect-[2/3] overflow-hidden">
              <img
                src={`/poster/${image}`}
                alt={`Movie poster ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay - darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-[#141414]"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-end justify-center h-full text-white">
          <div className="text-center max-w-4xl mx-auto px-4 mb-5">
            <h1 className="text2xl md:text-3xl lg:text-5xl font-medium mb-5">
              The Best Streaming Experience
            </h1>
            <p className="text-lg md:text-lg lg:text-xs mb-8 text-gray-300 max-w-3xl mx-auto">
              Cup Entertainment is the best streaming platform that allows users
              to watch a wide variety of content, including the latest
              blockbusters, classic movies, popular TV shows, and more. You can
              also create your own watchlist, so you can easily find the content
              you want to watch.
            </p>
            <button className="bg-[#c12790] font-semibold py-3 px-5 rounded-lg text-xs transition-all duration-500 transform hover:scale-105 flex items-center space-x-2 mx-auto">
              <Play className="w-5 h-5" />
              <span>Start Watching Now</span>
            </button>
          </div>
        </div>

      </div>

      {/* Categories Section */}
      <section className="py-16 bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explore our wide variety of categories
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto text-md">
            Whether you're looking for a comedy to make you laugh, a drama to
            make you think, or a documentary to learn something new.
          </p>

          {/* Category Grid */}
          <div className="relative">
            {/* Navigation arrows */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex space-x-2 z-10">
              <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Categories horizontal scroll */}
            <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
              {[
                {
                  name: "Action",
                  images: [
                    "Image (1).png",
                    "Image (2).png",
                    "Image (3).png",
                    "Image (4).png",
                  ],
                },
                {
                  name: "Adventure",
                  images: [
                    "Image (5).png",
                    "Image (6).png",
                    "Image (7).png",
                    "Image (8).png",
                  ],
                },
                {
                  name: "Comedy",
                  images: [
                    "Image (9).png",
                    "Image (10).png",
                    "Image (11).png",
                    "Image (12).png",
                  ],
                },
                {
                  name: "Drama",
                  images: [
                    "Image (13).png",
                    "Image (14).png",
                    "Image (15).png",
                    "Image (16).png",
                  ],
                },
                {
                  name: "Horror",
                  images: [
                    "Image (17).png",
                    "Image (18).png",
                    "Image (19).png",
                    "Image (20).png",
                  ],
                },
              ].map((category, index) => (
                <div key={index} className="group cursor-pointer flex-shrink-0 w-80">
                  <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors">
                    <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden mb-4">
                      {category.images.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={`/poster/${image}`}
                          alt={`${category.name} ${imgIndex + 1}`}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                        {category.name}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
