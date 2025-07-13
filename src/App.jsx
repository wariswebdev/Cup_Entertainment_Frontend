import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import ErrorBoundary from "./components/ErrorBoundary";

// Import all admin pages
import Dashboard from "./pages/admin/Dashboard";
import AllMovies from "./pages/admin/AllMovies";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";
import MovieCategories from "./pages/admin/MovieCategories";
import Tags from "./pages/admin/Tags";
import TVShows from "./pages/admin/TVShows";
import LiveStreaming from "./pages/admin/LiveStreaming";
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";
import SystemSettings from "./pages/admin/SystemSettings";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Redirect root to admin dashboard */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          {/* Movie Routes */}
          <Route
            path="/admin/movies"
            element={
              <AdminLayout>
                <AllMovies />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/movies/add"
            element={
              <AdminLayout>
                <AddMovie />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/movies/edit/:id"
            element={
              <AdminLayout>
                <EditMovie />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/movies/categories"
            element={
              <AdminLayout>
                <MovieCategories />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/movies/tags"
            element={
              <AdminLayout>
                <Tags />
              </AdminLayout>
            }
          />

          {/* TV Shows Routes */}
          <Route
            path="/admin/tv-shows"
            element={
              <AdminLayout>
                <TVShows />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/tv-shows/add"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Add TV Show
                  </h2>
                  <p className="text-gray-600">
                    Add TV show functionality coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          <Route
            path="/admin/tv-shows/categories"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    TV Show Categories
                  </h2>
                  <p className="text-gray-600">
                    TV show categories management coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          <Route
            path="/admin/tv-shows/tags"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    TV Show Tags
                  </h2>
                  <p className="text-gray-600">
                    TV show tags management coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          {/* Live Streaming */}
          <Route
            path="/admin/live-streaming"
            element={
              <AdminLayout>
                <LiveStreaming />
              </AdminLayout>
            }
          />

          {/* Articles */}
          <Route
            path="/admin/articles"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Articles Management
                  </h2>
                  <p className="text-gray-600">
                    Articles management system coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          {/* User Management */}
          <Route
            path="/admin/users"
            element={
              <AdminLayout>
                <UserManagement />
              </AdminLayout>
            }
          />

          {/* Monetization & Ads */}
          <Route
            path="/admin/monetization"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Monetization & Ads
                  </h2>
                  <p className="text-gray-600">
                    Monetization and advertising management coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          {/* Leaderboard */}
          <Route
            path="/admin/leaderboard"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Leaderboard
                  </h2>
                  <p className="text-gray-600">
                    Leaderboard system coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          {/* Policy Pages */}
          <Route
            path="/admin/policies"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Policy Pages
                  </h2>
                  <p className="text-gray-600">
                    Policy pages management coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          {/* Analytics */}
          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <Analytics />
              </AdminLayout>
            }
          />

          {/* FAQs & Help Center */}
          <Route
            path="/admin/help"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    FAQs & Help Center
                  </h2>
                  <p className="text-gray-600">
                    Help center management coming soon.
                  </p>
                </div>
              </AdminLayout>
            }
          />

          {/* System & Settings */}
          <Route
            path="/admin/settings"
            element={
              <AdminLayout>
                <SystemSettings />
              </AdminLayout>
            }
          />

          {/* Fallback for unmatched admin routes */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Page Not Found
                  </h2>
                  <p className="text-gray-600">
                    The page you're looking for doesn't exist.
                  </p>
                </div>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
