import React, { useState } from "react";
import {
  Radio,
  Plus,
  Play,
  Pause,
  Users,
  Eye,
  Calendar,
  Settings,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const LiveStreaming = () => {
  const [streams, setStreams] = useState([
    {
      id: 1,
      title: "Movie Premiere: The New Adventure",
      status: "live",
      viewers: 1234,
      startTime: "2025-01-15T19:00:00",
      thumbnail:
        "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Live+Movie",
      category: "Movie Premiere",
      duration: "2h 45m",
    },
    {
      id: 2,
      title: "Behind the Scenes: Comedy Special",
      status: "scheduled",
      viewers: 0,
      startTime: "2025-01-16T20:00:00",
      thumbnail:
        "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Comedy+BTS",
      category: "Behind the Scenes",
      duration: "1h 30m",
    },
    {
      id: 3,
      title: "Q&A with Director",
      status: "ended",
      viewers: 856,
      startTime: "2025-01-14T18:00:00",
      thumbnail:
        "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Director+QA",
      category: "Interview",
      duration: "1h 15m",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStream, setNewStream] = useState({
    title: "",
    description: "",
    startTime: "",
    category: "",
    thumbnail: null,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "ended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "live":
        return (
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        );
      case "scheduled":
        return <Calendar className="w-4 h-4" />;
      case "ended":
        return <Pause className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const stats = [
    {
      title: "Live Streams",
      value: streams.filter((s) => s.status === "live").length,
      icon: Radio,
      color: "text-red-600",
    },
    {
      title: "Total Viewers",
      value: streams
        .reduce((sum, stream) => sum + stream.viewers, 0)
        .toLocaleString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Scheduled",
      value: streams.filter((s) => s.status === "scheduled").length,
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Total Streams",
      value: streams.length,
      icon: Eye,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Streaming</h1>
          <p className="text-gray-600 mt-1">
            Manage live streams, premieres, and scheduled events.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Stream Settings</span>
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Stream</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Current Live Streams */}
      {streams.filter((s) => s.status === "live").length > 0 && (
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <Card.Title>Currently Live</Card.Title>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {streams
                .filter((s) => s.status === "live")
                .map((stream) => (
                  <div
                    key={stream.id}
                    className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          LIVE
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {stream.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {stream.category}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>
                              {stream.viewers.toLocaleString()} viewers
                            </span>
                          </div>
                          <span className="text-gray-500">
                            {stream.duration}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </Card.Content>
        </Card>
      )}

      {/* All Streams */}
      <Card>
        <Card.Header>
          <Card.Title>All Streams</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream) => (
              <div
                key={stream.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-full ${getStatusColor(
                        stream.status
                      )}`}
                    >
                      {getStatusIcon(stream.status)}
                      <span className="capitalize">{stream.status}</span>
                    </span>
                  </div>
                  {stream.status === "live" && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {stream.viewers.toLocaleString()} viewers
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {stream.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {stream.category}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>
                      {new Date(stream.startTime).toLocaleDateString()}
                    </span>
                    <span>{stream.duration}</span>
                  </div>

                  <div className="flex space-x-2">
                    {stream.status === "live" ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Watch Live
                      </Button>
                    ) : stream.status === "scheduled" ? (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        Edit Schedule
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Stream Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Stream Performance</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Radio className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Analytics chart would go here</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Upcoming Streams</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {streams
                .filter((s) => s.status === "scheduled")
                .map((stream) => (
                  <div
                    key={stream.id}
                    className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <Calendar className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {stream.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(stream.startTime).toLocaleString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Create Stream Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Create New Stream
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stream Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter stream title"
                    value={newStream.title}
                    onChange={(e) =>
                      setNewStream({ ...newStream, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newStream.category}
                    onChange={(e) =>
                      setNewStream({ ...newStream, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Movie Premiere">Movie Premiere</option>
                    <option value="Behind the Scenes">Behind the Scenes</option>
                    <option value="Interview">Interview</option>
                    <option value="Live Event">Live Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newStream.startTime}
                    onChange={(e) =>
                      setNewStream({ ...newStream, startTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button>Create Stream</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreaming;
