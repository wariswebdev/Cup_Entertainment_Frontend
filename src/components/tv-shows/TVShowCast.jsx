import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const TVShowCast = ({ cast }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

  const nextSlide = () => {
    if (startIndex + itemsPerPage < cast.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - itemsPerPage));
    }
  };

  const visibleCast = cast.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Cast</h3>

        {/* Navigation Arrows */}
        {cast.length > itemsPerPage && (
          <div className="flex space-x-2">
            <motion.button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className={`p-2 rounded-full transition-colors ${
                startIndex === 0
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
              whileHover={startIndex > 0 ? { scale: 1.1 } : {}}
              whileTap={startIndex > 0 ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              disabled={startIndex + itemsPerPage >= cast.length}
              className={`p-2 rounded-full transition-colors ${
                startIndex + itemsPerPage >= cast.length
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
              whileHover={
                startIndex + itemsPerPage < cast.length ? { scale: 1.1 } : {}
              }
              whileTap={
                startIndex + itemsPerPage < cast.length ? { scale: 0.9 } : {}
              }
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Cast Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {visibleCast.map((actor, index) => (
          <motion.div
            key={actor.name}
            className="text-center group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Actor Image */}
            <div className="relative mb-3">
              <div className="w-full aspect-square bg-gray-700 rounded-full overflow-hidden mx-auto">
                {actor.image ? (
                  <img
                    src={actor.image}
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                {/* Fallback */}
                <div
                  className="w-full h-full flex items-center justify-center bg-gray-600"
                  style={{ display: actor.image ? "none" : "flex" }}
                >
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Actor Info */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-400 transition-colors">
                {actor.name}
              </h4>
              <p className="text-gray-400 text-xs">{actor.character}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      {cast.length > itemsPerPage && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: Math.ceil(cast.length / itemsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index * itemsPerPage)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(startIndex / itemsPerPage) === index
                    ? "w-8 bg-[#af3494]"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TVShowCast;
