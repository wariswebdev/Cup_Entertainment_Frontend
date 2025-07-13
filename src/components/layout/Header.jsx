import React, { useState } from "react";
import {
  Search,
  Bell,
  Menu,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import Button from "../ui/Button";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { userProfile, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 md:h-19 px-4 md:px-6 py-3 md:py-4 shadow-sm shadow-gray-300 dark:shadow-gray-700 transition-colors">
      <div className="flex items-center justify-between h-full">
        {/* Left - Menu button (mobile) */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Center - Search (hidden on small mobile) */}
        <div className="flex-1 max-w-xl mx-4 md:mx-8 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 md:pl-10 pr-4 py-1.5 md:py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 sm:hidden text-gray-700 dark:text-gray-300"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Moon className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-2 relative text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-2 hidden md:block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 md:space-x-3 p-1 md:p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#af3494] rounded-full flex items-center justify-center">
                <span className="text-white text-xs md:text-sm font-medium">
                  {getInitials(userProfile?.name)}
                </span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {userProfile?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Administrator
                </p>
              </div>
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400 dark:text-gray-500 hidden md:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {userProfile?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userProfile?.email}
                  </p>
                </div>

                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>

                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </button>

                <hr className="my-1 border-gray-200 dark:border-gray-600" />

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
