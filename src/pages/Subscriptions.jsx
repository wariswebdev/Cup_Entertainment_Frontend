import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import StartFreeTrial from "../components/home/StartFreeTrial";
import Footer from "../components/home/Footer";

const Subscriptions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState("Monthly");

  const plans = [
    {
      name: "Basic Plan",
      description:
        "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      monthlyPrice: "$9.99",
      yearlyPrice: "$99.99",
      features: [
        "HD streaming",
        "Single device",
        "Basic support",
        "Standard library",
      ],
    },
    {
      name: "Standard Plan",
      description:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      monthlyPrice: "$12.99",
      yearlyPrice: "$129.99",
      features: [
        "Full HD streaming",
        "2 devices",
        "Priority support",
        "Exclusive content",
      ],
    },
    {
      name: "Premium Plan",
      description:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      monthlyPrice: "$14.99",
      yearlyPrice: "$149.99",
      features: [
        "4K Ultra HD",
        "4 devices",
        "Premium support",
        "Offline viewing",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
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
    <div className="bg-[#101010]">

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-300 pt-10 ${
          sidebarOpen ? "" : ""
        } `}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Choose the plan that's right for you
          </h1>
          <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-3xl mx-auto px-4">
            Join StreamVibe and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <div className="bg-[#1a1a1a] rounded-lg p-1 flex">
            {["Monthly", "Yearly"].map((cycle) => (
              <motion.button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-4 md:px-6 py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-200 ${
                  billingCycle === cycle
                    ? "bg-[#af3494] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cycle}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4"
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-[#af3494] transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              {/* Plan Name */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                {plan.name}
              </h3>

              {/* Plan Description */}
              <p className="text-gray-400 mb-6 text-xs md:text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6 md:mb-8">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {billingCycle === "Monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice}
                  <span className="text-xs md:text-sm font-normal text-gray-400">
                    /{billingCycle === "Monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "Yearly" && (
                  <div className="text-green-400 text-xs md:text-sm font-medium">
                    Save 2 months with yearly billing
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <motion.button
                  className="w-full py-2 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base font-medium bg-[#af3494] text-white hover:bg-[#9c2d84] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choose Plan
                </motion.button>
                <motion.button
                  className="w-full py-2 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base font-medium border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Comparison Table */}
        <motion.div
          className="mt-12 md:mt-16 bg-[#1a1a1a] rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-800 mx-4 mb-10"
          variants={itemVariants}
        >
          {/* Title outside the table */}
          <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-6 md:mb-8">
            Compare Our Plans
          </h3>

          <div className="overflow-x-auto">
            <table
              className="w-full border-separate min-w-[600px]"
              style={{ borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  <th
                    className="text-left py-3 md:py-4 px-2 md:px-4 text-gray-200 font-semibold bg-[#181818] border-r border-gray-700 first:rounded-tl-2xl text-sm md:text-base"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Features
                  </th>
                  <th
                    className="text-center py-3 md:py-4 px-2 md:px-4 text-gray-200 font-semibold bg-[#181818] border-r border-gray-700 text-sm md:text-base"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Basic
                  </th>
                  <th
                    className="text-center py-3 md:py-4 px-2 md:px-4 text-gray-200 font-semibold bg-[#181818] border-r border-gray-700 relative text-sm md:text-base"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <div className="relative inline-block">
                      Standard
                      <span className="mx-2 bg-[#af3494] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Popular
                      </span>
                    </div>
                  </th>
                  <th className="text-center py-3 md:py-4 px-2 md:px-4 text-gray-200 font-semibold bg-[#181818] last:rounded-tr-2xl text-sm md:text-base">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm">
                <tr className="border-b border-gray-800">
                  <td
                    className="py-3 md:py-4 px-2 md:px-4 text-white font-medium border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Price
                  </td>
                  <td
                    className="py-3 md:py-4 px-2 md:px-4 text-center text-gray-300 border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    {billingCycle === "Monthly" ? "$9.99/Month" : "$99.99/Year"}
                  </td>
                  <td
                    className="py-3 md:py-4 px-2 md:px-4 text-center text-gray-300 border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    {billingCycle === "Monthly"
                      ? "$12.99/Month"
                      : "$129.99/Year"}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-center text-gray-300">
                    {billingCycle === "Monthly"
                      ? "$14.99/Month"
                      : "$149.99/Year"}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Content
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 text-xs border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Access to a wide selection of movies and shows, including
                    some new releases
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 text-xs border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Access to a wider selection of movies and shows, including
                    most new releases and exclusive content
                  </td>
                  <td className="py-4 px-4 text-center text-gray-300 text-xs">
                    Access to a widest selection of movies and shows, including
                    all new releases and Offline Viewing
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Devices
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Watch on one device simultaneously
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Watch on Two device simultaneously
                  </td>
                  <td className="py-4 px-4 text-center text-gray-300">
                    Watch on Four device simultaneously
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Free Trial
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    7 Days
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    7 Days
                  </td>
                  <td className="py-4 px-4 text-center text-gray-300">
                    7 Days
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Cancel Anytime
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-green-400">Yes</span>
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-green-400">Yes</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-400">Yes</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    HDR
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-red-400">No</span>
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-green-400">Yes</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-400">Yes</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Dolby Atmos
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-red-400">No</span>
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-green-400">Yes</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-400">Yes</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Ad - Free
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-red-400">No</span>
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-green-400">Yes</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-400">Yes</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Offline Viewing
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-red-400">No</span>
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 text-xs border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Yes, for select titles
                  </td>
                  <td className="py-4 px-4 text-center text-gray-300 text-xs">
                    Yes, for all titles
                  </td>
                </tr>
                <tr>
                  <td
                    className="py-4 px-4 text-white border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Family Sharing
                  </td>
                  <td
                    className="py-4 px-4 text-center border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    <span className="text-red-400">No</span>
                  </td>
                  <td
                    className="py-4 px-4 text-center text-gray-300 text-xs border-r border-gray-700"
                    style={{ borderRight: "1px solid #333" }}
                  >
                    Yes, up to 5 family members
                  </td>
                  <td className="py-4 px-4 text-center text-gray-300 text-xs">
                    Yes, up to 6 family members
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Start Free Trial Section */}
        <StartFreeTrial />

        
        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default Subscriptions;
