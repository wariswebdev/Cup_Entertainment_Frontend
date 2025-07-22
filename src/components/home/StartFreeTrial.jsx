import React from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Download, 
  Star, 
  Shield, 
  Users, 
  Globe,
  Clock,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const StartFreeTrial = () => {
  const handleStartTrial = () => {
    // Handle start trial action
    console.log("Starting free trial...");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const trialFeatures = [
    {
      icon: Clock,
      title: "30 Days Free",
      description: "Full access to our entire library"
    },
    {
      icon: Play,
      title: "4K Streaming",
      description: "Ultra HD quality on all devices"
    },
    {
      icon: Download,
      title: "Offline Downloads",
      description: "Watch anywhere, anytime"
    },
    {
      icon: Users,
      title: "5 Profiles",
      description: "Personalized for your family"
    }
  ];

  const benefits = [
    "Access to 10,000+ movies and TV shows",
    "New releases added weekly",
    "Ad-free streaming experience", 
    "Cancel anytime with no commitment",
    "Multi-device streaming"
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#af3494]/20 via-purple-900/10 to-transparent"></div>
        
        {/* Floating Movie Posters */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-24 sm:w-20 sm:h-30 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `url(/poster/Image (${(i % 28) + 1}).png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#af3494]/20 border border-[#af3494]/30 rounded-full text-[#af3494] text-sm font-medium mb-6"
            variants={itemVariants}
          >
            <Star className="w-4 h-4 mr-2 fill-current" />
            <span>Start Your Entertainment Journey</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Experience Premium Entertainment
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#af3494] to-purple-400">
              Absolutely Free
            </span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join millions of viewers and discover why Cup Entertainment is the world's leading streaming platform. 
            Start your 30-day free trial today – no credit card required.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - CTA Card */}
          <motion.div variants={cardVariants}>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-8 lg:p-10 border border-gray-800 hover:border-[#af3494]/50 transition-all duration-300">
              
              {/* Trial Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {trialFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-[#141414] rounded-xl p-4 border border-gray-700 hover:border-[#af3494]/30 transition-all duration-300 group"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#af3494] to-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleStartTrial}
                className="w-full bg-gradient-to-r from-[#af3494] to-purple-600 hover:from-[#9c2d84] hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-6 mt-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Available Worldwide</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Benefits List */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                What You Get With Your Free Trial
              </h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 group"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-[#af3494] to-purple-600 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div 
                className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 mt-8"
                variants={itemVariants}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">
                      No Commitment Required
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      Cancel anytime during your trial period. No hidden fees, no long-term contracts. 
                      If you're not completely satisfied, simply cancel before your trial ends.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Pricing Teaser */}
              <motion.div 
                className="text-center text-gray-400 text-sm mt-6"
                variants={itemVariants}
              >
                <p>
                  After trial: Starting at <span className="text-[#af3494] font-semibold">$9.99/month</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 lg:mt-20"
          variants={containerVariants}
        >
          {[
            { number: "10M+", label: "Happy Subscribers" },
            { number: "50K+", label: "Movies & Shows" },
            { number: "4.8★", label: "User Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#af3494] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm lg:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StartFreeTrial;

