import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SessionWarning from "../auth/SessionWarning";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const { showSessionWarning, extendSession, logout } = useAuth();

  // Handle initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Open on desktop
      } else {
        setSidebarOpen(false); // Closed on mobile
      }
    };

    // Set initial state
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExtendSession = () => {
    extendSession();
  };

  const handleSessionLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden relative transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "md:ml-0" : "md:ml-0"
        }`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>

      {/* Session Warning Modal */}
      <SessionWarning
        isOpen={showSessionWarning}
        onExtend={handleExtendSession}
        onLogout={handleSessionLogout}
      />
    </div>
  );
};

export default AdminLayout;
