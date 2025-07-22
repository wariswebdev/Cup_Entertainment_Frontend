import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AdminLayout from "./components/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Import fonts
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// Import auth pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSetup from "./pages/admin/AdminSetup";

// Import pages
import Home from "./pages/Home";
import UserDashboard from "./pages/Dashboard";
import Watch from "./pages/Watch";
import Subscriptions from "./pages/Subscriptions";

// Import all admin pages
import Dashboard from "./pages/admin/Dashboard";
import AllMovies from "./pages/admin/AllMovies";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";
import MovieCategories from "./pages/admin/MovieCategories";
import Tags from "./pages/admin/Tags";
import TVShows from "./pages/admin/TVShows";
import AddTVShow from "./pages/admin/AddTVShow";
import EditTVShow from "./pages/admin/EditTVShow";
import LiveStreaming from "./pages/admin/LiveStreaming";
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";
import SystemSettings from "./pages/admin/SystemSettings";

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route
                path="/home"
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/setup" element={<AdminSetup />} />

              {/* User Dashboard Route */}
              <Route path="/dashboard" element={<UserDashboard />} />

              {/* Subscriptions Route */}
              <Route
                path="/dashboard/subscriptions"
                element={<Subscriptions />}
              />

              {/* Watch Route */}
              <Route path="/dashboard/watch" element={<Watch />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Movie Routes */}
              <Route
                path="/admin/movies"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AllMovies />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/movies/add"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AddMovie />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/movies/edit/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <EditMovie />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/movies/categories"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <MovieCategories />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/movies/tags"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Tags />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* TV Shows Routes */}
              <Route
                path="/admin/tv-shows"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <TVShows />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/tv-shows/add"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AddTVShow />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/tv-shows/edit/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <EditTVShow />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/tv-shows/categories"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <MovieCategories />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/tv-shows/tags"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Tags />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Live Streaming */}
              <Route
                path="/admin/live-streaming"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <LiveStreaming />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Articles */}
              <Route
                path="/admin/articles"
                element={
                  <ProtectedRoute>
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
                  </ProtectedRoute>
                }
              />

              {/* User Management */}
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <UserManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Monetization & Ads */}
              <Route
                path="/admin/monetization"
                element={
                  <ProtectedRoute>
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
                  </ProtectedRoute>
                }
              />

              {/* Leaderboard */}
              <Route
                path="/admin/leaderboard"
                element={
                  <ProtectedRoute>
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
                  </ProtectedRoute>
                }
              />

              {/* Policy Pages */}
              <Route
                path="/admin/policies"
                element={
                  <ProtectedRoute>
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
                  </ProtectedRoute>
                }
              />

              {/* Analytics */}
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Analytics />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* FAQs & Help Center */}
              <Route
                path="/admin/help"
                element={
                  <ProtectedRoute>
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
                  </ProtectedRoute>
                }
              />

              {/* System & Settings */}
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <SystemSettings />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Fallback for unmatched admin routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
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
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
