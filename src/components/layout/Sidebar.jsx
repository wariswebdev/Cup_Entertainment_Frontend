import React from "react";
import {
  LayoutDashboard,
  Film,
  Tv,
  Radio,
  FileText,
  Users,
  DollarSign,
  BarChart3,
  HelpCircle,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import logo from "../../assets/logo.png";
import logoSM from "../../assets/logo-sm.png";
import logoDark from "../../assets/logo-dark.png";
// import logoDarkSM from "../../assets/logo-dark-sm.png";


const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      exact: true,
    },
    {
      name: "Movies",
      icon: Film,
      path: "/admin/movies",
      subItems: [
        { name: "All Movies", path: "/admin/movies" },
        { name: "Add New Movie", path: "/admin/movies/add" },
        { name: "Categories/Genres", path: "/admin/movies/categories" },
        { name: "Tags", path: "/admin/movies/tags" },
      ],
    },
    {
      name: "TV Shows",
      icon: Tv,
      path: "/admin/tv-shows",
      subItems: [
        { name: "All TV Shows", path: "/admin/tv-shows" },
        { name: "Add New Show", path: "/admin/tv-shows/add" },
        { name: "Categories/Genres", path: "/admin/tv-shows/categories" },
        { name: "Tags", path: "/admin/tv-shows/tags" },
      ],
    },
    {
      name: "Live Streaming",
      icon: Radio,
      path: "/admin/live-streaming",
    },
    {
      name: "Articles",
      icon: FileText,
      path: "/admin/articles",
    },
    {
      name: "User Management",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Monetization & Ads",
      icon: DollarSign,
      path: "/admin/monetization",
    },
    {
      name: "Leaderboard",
      icon: BarChart3,
      path: "/admin/leaderboard",
    },
    {
      name: "Policy Pages",
      icon: FileText,
      path: "/admin/policies",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
    {
      name: "FAQs & Help Center",
      icon: HelpCircle,
      path: "/admin/help",
    },
    {
      name: "System & Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const isActiveRoute = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } min-h-screen`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-300 flex items-center h-19">
        {isOpen ? (
          <img src={logo} alt="Cup Entertainment" className="h-17" />
        ) : (
          <img src={logoSM} alt="Cup Entertainment" className="h-12" />
        )}
      </div>
      

      <SidebarButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

      {/* Navigation */}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActiveRoute(item)
                  ? "bg-[#af3494]/10 text-[#af3494] border-r-2 border-[#af3494]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {isOpen && (
                <>
                  <span className="ml-2">{item.name}</span>
                  {item.subItems && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </>
              )}
            </Link>

            {/* Sub Items */}
            {isOpen && item.subItems && isActiveRoute(item) && (
              <div className="bg-gray-50">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.path}
                    className={`flex items-center px-12 py-2 text-sm transition-colors ${
                      location.pathname === subItem.path
                        ? "text-[#af3494] font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
