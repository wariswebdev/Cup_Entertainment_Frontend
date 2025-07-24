import React from "react";
import {
  Search,
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import logoDark from "../assets/logo-dark.png";
import { useRef, useState } from "react";
import DeviceCompatibility from "../components/home/DeviceCompatibility";
import TrendingNow from "../components/home/TrendingNow";
import FAQ from "../components/home/FAQ";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import StartFreeTrial from "../components/home/StartFreeTrial";
import Footer from "../components/home/Footer";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const scrollRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

  const categories = [
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
  ];

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4 mb-2 sm:mb-3">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logoDark}
                alt="Cup Entertainment"
                className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto"
              />
            </div>

            {/* Navigation Links - Hidden on mobile/tablet */}
            <div className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium text-sm 2xl:text-base"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium text-sm 2xl:text-base"
              >
                Movies & Shows
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium text-sm 2xl:text-base"
              >
                Support
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors font-medium text-sm 2xl:text-base"
              >
                Subscriptions
              </a>
            </div>

            {/* Search and User Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <button className="text-white hover:text-gray-300 transition-colors p-1.5 sm:p-2 touch-manipulation rounded-full hover:bg-white/10">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors p-1.5 sm:p-2 touch-manipulation rounded-full hover:bg-white/10">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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

              {/* Mobile menu button */}
              <div className="xl:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-gray-300 transition-colors p-1.5 sm:p-2 touch-manipulation rounded-full hover:bg-white/10"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 xl:hidden"
            onClick={closeMobileMenu}
          >
            {/* Mobile Menu Panel */}
            <div
              className="absolute right-0 top-0 h-full w-80 bg-[#1a1a1a] shadow-xl transform transition-transform duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <img
                  src={logoDark}
                  alt="Cup Entertainment"
                  className="h-8 w-auto"
                />
                <button
                  onClick={closeMobileMenu}
                  className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1 p-6">
                <a
                  href="#"
                  className="text-white hover:text-purple-400 transition-colors font-medium text-lg py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-white hover:text-purple-400 transition-colors font-medium text-lg py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  Movies & Shows
                </a>
                <a
                  href="#"
                  className="text-white hover:text-purple-400 transition-colors font-medium text-lg py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-white hover:text-purple-400 transition-colors font-medium text-lg py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={closeMobileMenu}
                >
                  Subscriptions
                </a>
              </div>

              {/* Additional Options */}
              <div className="border-t border-gray-700 p-6">
                <Link
                  to="/login"
                  className="w-full bg-[#af3494] hover:bg-[#9c2d84] text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full mt-3 border border-gray-600 hover:border-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
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
          <div className="text-center max-w-4xl mx-auto px-4 mb-16 lg:mb-5">
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-medium mb-5">
              The Best Streaming Experience
            </h1>
            <p
              className="text-gray-300 max-w-4xl mx-auto leading-relaxed mb-5 sm:mb-7 md:mb-8 lg:mb-10
              text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl
              px-1 xs:px-2 sm:px-4 md:px-6
              line-height-relaxed"
            >
              Cup Entertainment is the best streaming platform that allows users
              to watch a wide variety of content, including the latest
              blockbusters, classic movies, popular TV shows, and more. You can
              also create your own watchlist, so you can easily find the content
              you want to watch.
            </p>
            <button
              className="bg-[#af3494] font-semibold rounded-lg transition-all duration-500 
              transform hover:scale-105 hover:bg-[#9c2d84] active:scale-95
              flex items-center space-x-2 sm:space-x-3 mx-auto touch-manipulation
              py-2.5 px-5 text-xs
              xs:py-3 xs:px-6 xs:text-sm
              sm:py-3.5 sm:px-7 sm:text-sm
              md:py-4 md:px-8 md:text-base
              lg:py-4 lg:px-9 lg:text-base
              xl:py-5 xl:px-10 xl:text-lg
              shadow-lg hover:shadow-xl active:shadow-md
              min-h-[44px] min-w-[120px]"
            >
              <Play className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              <span onClick={() => navigate("/dashboard")}>
                Start Watching Now
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12">
            Explore our wide variety of categories
          </h2>
          <p className="text-gray-400 text-center mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
            Whether you're looking for a comedy to make you laugh, a drama to
            make you think, or a documentary to learn something new.
          </p>

          {/* Category Grid */}
          <div className="relative">
            {/* Navigation Arrows - Hidden on mobile */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:flex space-x-2 z-10">
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

            {/* Categories Row - Enhanced Responsive Design */}
            <div
              ref={scrollRef}
              className="flex space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto md:overflow-hidden scroll-smooth pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group cursor-pointer flex-shrink-0 
                    w-64 xs:w-72 sm:w-80 md:w-80 lg:w-80 xl:w-80"
                >
                  <div className="bg-[#1c1c1c] rounded-lg p-3 sm:p-4 hover:bg-[#1a1919] transition-colors">
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 rounded-lg overflow-hidden mb-3 sm:mb-4">
                      {category.images.map((image, i) => (
                        <img
                          key={i}
                          src={`/poster/${image}`}
                          alt={`${category.name} ${i + 1}`}
                          className="w-full h-24 xs:h-28 sm:h-32 md:h-32 object-cover 
                            group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-purple-400 transition-colors">
                        {category.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile scroll indicator dots */}
            <div className="flex justify-center space-x-2 mt-6 md:hidden">
              {[...Array(Math.ceil(categories.length / 2))].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-600"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <DeviceCompatibility />

      {/* Trending Now Section */}
      <TrendingNow />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* StartFreeTrial */}
      <StartFreeTrial />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
