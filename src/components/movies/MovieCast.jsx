import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const MovieCast = ({ cast }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  // Convert cast to array if it's a string
  const castArray = Array.isArray(cast)
    ? cast
    : typeof cast === "string"
    ? cast.split(",").map((name) => name.trim())
    : [];

  // Mock additional cast data (in a real app, this would come from an API)
  const enrichedCast = castArray.map((name, index) => ({
    id: index + 1,
    name: name,
    character: `Character ${index + 1}`, // This would come from API
    image: `https://via.placeholder.com/150x200/4B5563/F9FAFB?text=${encodeURIComponent(
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
    )}`,
  }));

  const totalPages = Math.ceil(enrichedCast.length / itemsPerPage);
  const currentCast = enrichedCast.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (!castArray.length) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Cast</h2>

        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              disabled={totalPages <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {totalPages}
            </span>

            <button
              onClick={nextPage}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              disabled={totalPages <= 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {currentCast.map((member, index) => (
          <motion.div
            key={member.id}
            className="text-center group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative mb-3">
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-700">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full bg-gray-700 hidden items-center justify-center"
                  style={{ display: "none" }}
                >
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-medium text-sm">
                    {member.name}
                  </p>
                  <p className="text-gray-300 text-xs mt-1">
                    {member.character}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-white font-medium text-sm truncate group-hover:text-[#af3494] transition-colors">
                {member.name}
              </h3>
              <p className="text-gray-400 text-xs truncate">
                {member.character}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#af3494] scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCast;
