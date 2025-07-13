import React from "react";
import { TrendingUp, Users, Film, Tv, Eye, Download } from "lucide-react";
import Card from "../../components/ui/Card";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useMovies } from "../../hooks/useMovies";
import Loading from "../../components/ui/Loading";
import DatabaseSeeder from "../../components/admin/DatabaseSeeder";

const Dashboard = () => {
  const { stats, loading: analyticsLoading } = useAnalytics();
  const { movies, loading: moviesLoading } = useMovies();

  if (analyticsLoading || moviesLoading) {
    return <Loading />;
  }

  const dashboardStats = [
    {
      title: "Total Movies",
      value: stats.moviesCount.toString(),
      change: "+12%",
      icon: Film,
      color: "text-blue-600",
    },
    {
      title: "Total TV Shows",
      value: stats.tvShowsCount.toString(),
      change: "+8%",
      icon: Tv,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: stats.usersCount.toString(),
      change: "+23%",
      icon: Users,
      color: "text-[#af3494]",
    },
    {
      title: "Total Views",
      value: "1.2M",
      change: "+15%",
      icon: Eye,
      color: "text-orange-600",
    },
  ];

  // Get recent movies (latest 4)
  const recentMovies = movies
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)
    .map((movie) => ({
      title: movie.title || "Untitled",
      views: `${Math.floor(Math.random() * 100)}K`, // Placeholder views
      status: movie.status || "Active",
    }));

  return (
    <div className="space-y-6">
      {/* Development Seeder */}
      <DatabaseSeeder />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your entertainment
          platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <Card.Content>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <Card>
          <Card.Header>
            <Card.Title>Views Overview</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  Chart visualization would go here
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Recent Movies */}
        <Card>
          <Card.Header>
            <Card.Title>Popular Movies</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {recentMovies.map((movie, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#af3494]/10 rounded-lg flex items-center justify-center">
                      <Film className="w-5 h-5 text-[#af3494]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{movie.title}</p>
                      <p className="text-sm text-gray-500">
                        {movie.views} views
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {movie.status}
                  </span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <Card.Title>Quick Actions</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Film className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add New Movie</p>
                  <p className="text-sm text-gray-500">
                    Upload and manage movies
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Tv className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add TV Show</p>
                  <p className="text-sm text-gray-500">
                    Create new series content
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#af3494]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#af3494]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-500">
                    View and edit user accounts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Dashboard;
