import React from "react";
import { Star, Quote } from "lucide-react";

const StartFreeTrial = () => {
  const handleStartTrial = () => {
    // Handle start trial action
    console.log("Starting free trial...");
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      {/* Background with movie posters grid */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-red-900/20 to-purple-900/20">
        <div className="absolute inset-0 bg-black/70 sm:bg-black/60"></div>
        {/* Movie poster grid background */}
        <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 opacity-20 sm:opacity-30">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-gradient-to-br from-red-600/30 to-purple-600/30 rounded-sm"
              style={{
                background: `url(/poster/Image (${(i % 28) + 1}).png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            Start your free trial today!
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of Cup Entertainment.
          </p>

          <div className="pt-2 sm:pt-4 lg:pt-6">
            <button
              onClick={handleStartTrial}
              className="inline-flex items-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl touch-manipulation"
            >
              Start a Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartFreeTrial;
