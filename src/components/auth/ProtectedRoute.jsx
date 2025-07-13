import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/ui/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, userProfile, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Authenticating..." />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
    );
  }

  // If authenticated and is admin, render the protected component
  return children;
};

export default ProtectedRoute;
