import React from "react";
import {
  Play,
  Download,
  Users,
  Shield,
  Zap,
  Globe,
  Heart,
  Star,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Play,
      title: "Unlimited Streaming",
      description:
        "Watch unlimited movies and TV shows anytime, anywhere without any restrictions.",
      color: "bg-purple-600",
    },
    {
      icon: Download,
      title: "Offline Downloads",
      description:
        "Download your favorite content and watch offline during travel or poor connectivity.",
      color: "bg-blue-600",
    },
    {
      icon: Users,
      title: "Multiple Profiles",
      description:
        "Create up to 5 profiles for family members with personalized recommendations.",
      color: "bg-green-600",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-level security and privacy measures.",
      color: "bg-red-600",
    },
    {
      icon: Zap,
      title: "4K Ultra HD",
      description:
        "Experience stunning picture quality with 4K Ultra HD and HDR content support.",
      color: "bg-yellow-600",
    },
    {
      icon: Globe,
      title: "Global Content",
      description:
        "Access content from around the world with subtitles in multiple languages.",
      color: "bg-indigo-600",
    },
    {
      icon: Heart,
      title: "Smart Recommendations",
      description:
        "AI-powered suggestions based on your viewing history and preferences.",
      color: "bg-pink-600",
    },
    {
      icon: Star,
      title: "Premium Experience",
      description:
        "Ad-free viewing experience with exclusive premium content and early releases.",
      color: "bg-orange-600",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Why Choose Cup Entertainment?
          </h2>
          <p className="text-gray-400 max-w-4xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
            We're committed to providing the best streaming experience with
            cutting-edge technology and an extensive content library.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 lg:p-8 hover:bg-[#202020] transition-all duration-300 border border-gray-800 hover:border-purple-600 group transform hover:scale-105"
              >
                <div
                  className={`${feature.color} w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
