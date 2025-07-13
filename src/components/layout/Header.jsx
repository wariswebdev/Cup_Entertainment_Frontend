import React from "react";
import { Search, Bell, Menu, User } from "lucide-react";
import Button from "../ui/Button";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-19 py-4 shadow-sm shadow-gray-300">
      <div className="flex items-center justify-between">


        {/* Center - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2">
            🌙
          </Button>

          <Button variant="ghost" size="sm" className="p-2 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="sm" className="p-2">
            ⚙️
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AR</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                Austin Robertson
              </p>
              <p className="text-xs text-gray-500">Marketing Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
