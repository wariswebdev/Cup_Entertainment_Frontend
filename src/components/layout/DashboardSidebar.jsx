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
  PlayCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoDarkSM from "../../assets/logo-dark-sm.png";
import logoDark from "../../assets/logo-dark.png";

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
      icon: PlayCircle,
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
            className="fixed inset-0 bg-[#101010] z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 h-full z-50 bg-[#101010] shadow-lg"
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex flex-col align-center justify-between h-full">
          {/* Logo Section */}
          <div className="p-3">
            <div className="flex items-center justify-center">
              <img
                src={isOpen ? logoDark : logoDarkSM}
                alt="Cup Entertainment"
                className={`w-auto ${isOpen ? "h-19" : "h-10"}`}
              />
            </div>
          </div>

          {/* Main Menu Items */}
          <div className="flex-1 py-4 mt-17">
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
          <div className="p-2">
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
                  className="mt-3 pt-3"
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

      {/* Circular Collapse Button - positioned at the edge of sidebar */}
      <motion.div
        className={`fixed bottom-16 z-[9999] cursor-pointer transition-all duration-300 ${
          isOpen ? "left-60" : "left-12"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        transition={{ duration: 0.3 }}
      >
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#af3494] shadow-lg hover:bg-[#9c2d84] transition-colors">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default DashboardSidebar;
