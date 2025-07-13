import React, { useEffect } from "react";
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
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import SidebarButton from "./SidebarButton";
import logo from "../../assets/logo.png";
import logoSM from "../../assets/logo-sm.png";
import logoDark from "../../assets/logo-dark.png";
// import logoDarkSM from "../../assets/logo-dark-sm.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { darkMode } = useTheme();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        setIsOpen(false);
      }
    };

    // Close sidebar on route change for mobile
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname, setIsOpen]);

  // Manage body class for mobile sidebar
  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isOpen) {
        document.body.classList.add("sidebar-open");
      } else {
        document.body.classList.remove("sidebar-open");
      }
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isOpen]);

  // Handle click outside sidebar on mobile
  const handleOverlayClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

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
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sidebar-transition ${
          isOpen ? "w-64" : "w-20"
        } min-h-screen fixed md:relative z-50 md:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } shadow-lg md:shadow-none`}
      >
        {/* Logo */}
        <div
          className={`p-4 border-b border-gray-300 dark:border-gray-600 flex items-center h-19 ${
            !isOpen ? "justify-center" : ""
          } relative`}
        >
          {isOpen ? (
            <img
              src={darkMode ? logoDark : logo}
              alt="Cup Entertainment"
              className="h-17"
            />
          ) : (
            <img src={logoSM} alt="Cup Entertainment" className="h-12" />
          )}

          {/* Mobile close button */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>

        {/* Render SidebarButton only on non-mobile view */}
        {window.innerWidth >= 768 && (
          <SidebarButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        )}

        {/* Navigation */}
        <nav className="overflow-y-auto max-h-screen">
          {menuItems.map((item) => (
            <div key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center py-3 m-2 text-sm font-medium transition-colors ${
                  isOpen ? "px-4" : "px-0 justify-center"
                } ${
                  isActiveRoute(item)
                    ? "bg-[#af3494]/10 text-[#af3494] rounded-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                onClick={() => {
                  // Close sidebar on mobile when clicking menu item
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <item.icon className="w-5 h-5" />
                {isOpen && (
                  <>
                    <span className="ml-2">{item.name}</span>
                    {item.subItems && window.innerWidth >= 768 && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </>
                )}
              </Link>

              {/* Sub Items */}
              {isOpen && item.subItems && isActiveRoute(item) && (
                <div className="bg-gray-50 dark:bg-gray-700/50">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={`flex items-center px-12 py-2 text-sm transition-colors ${
                        location.pathname === subItem.path
                          ? "text-[#af3494] font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                      onClick={() => {
                        // Close sidebar on mobile when clicking sub menu item
                        if (window.innerWidth < 768) {
                          setIsOpen(false);
                        }
                      }}
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
    </>
  );
};

export default Sidebar;
