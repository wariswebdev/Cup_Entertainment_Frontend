import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Tv,
  Play,
  Heart,
  ChevronRight,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoDarkSM from "../../assets/logo-dark-sm.png";

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      name: "TV Shows",
      icon: Tv,
      path: "/dashboard/tv-shows",
      active: location.pathname.includes("/tv-shows"),
    },
    {
      name: "Movies",
      icon: Play,
      path: "/dashboard/movies",
      active: location.pathname.includes("/movies"),
    },
    {
      name: "Favorites",
      icon: Heart,
      path: "/dashboard/favorites",
      active: location.pathname.includes("/favorites"),
    },
  ];

  const bottomItems = [
    {
      name: "Search",
      icon: Search,
      path: "/dashboard/search",
    },
    {
      name: "Profile",
      icon: User,
      path: "/dashboard/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const sidebarVariants = {
    open: {
      width: 256,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    closed: {
      width: 64,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full z-50 bg-[#1a1a1a] border-r border-gray-800 shadow-lg"
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-3 border-b border-gray-800">
            <div className="flex items-center justify-center">
              <img
                src={logoDarkSM}
                alt="Cup Entertainment"
                className="h-8 w-auto"
              />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    className="ml-3 text-lg font-bold text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    Cup Entertainment
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main Menu Items */}
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2 rounded-lg transition-all duration-200
                        ${
                          item.active
                            ? "bg-[#af3494] text-white"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                        ${!isOpen ? "justify-center" : ""}
                      `}
                      title={!isOpen ? item.name : ""}
                    >
                      <Icon
                        className={`${
                          isOpen ? "w-5 h-5 mr-3" : "w-5 h-5"
                        } flex-shrink-0`}
                      />
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            className="font-medium text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 p-2">
            {/* Sidebar Toggle Button */}
            <div className="mb-2">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                  flex items-center justify-center w-full px-3 py-2 rounded-lg transition-all duration-200
                  text-gray-300 hover:bg-gray-800 hover:text-white
                  ${!isOpen ? "justify-center" : ""}
                `}
                title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      className="ml-3 font-medium text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      Collapse
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Bottom Menu Items */}
            <div className="space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center px-3 py-2 rounded-lg transition-all duration-200
                      text-gray-300 hover:bg-gray-800 hover:text-white
                      ${!isOpen ? "justify-center" : ""}
                    `}
                    title={!isOpen ? item.name : ""}
                  >
                    <Icon
                      className={`${
                        isOpen ? "w-4 h-4 mr-3" : "w-4 h-4"
                      } flex-shrink-0`}
                    />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          className="text-sm font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>

            {/* User Profile Picture */}
            {!isOpen && (
              <motion.div
                className="mt-3 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-[#af3494] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="mt-3 pt-3 border-t border-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-[#af3494] rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        Premium Member
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardSidebar;
