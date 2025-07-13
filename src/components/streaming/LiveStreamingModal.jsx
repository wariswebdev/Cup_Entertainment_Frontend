import React, { useState } from "react";
import { X, Calendar, Users, Settings, Play, Pause, Radio } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { showToast } from "../../utils/notifications";

const LiveStreamingModal = ({
  isOpen,
  onClose,
  tvShow = null,
  onCreateStream,
  onStartStream,
  onStopStream,
  existingStreams = [],
}) => {
  const [activeTab, setActiveTab] = useState("create");
  const [newStream, setNewStream] = useState({
    title: "",
    description: "",
    category: "Movie Premiere",
    startTime: "",
    duration: "",
    thumbnail: null,
  });

  const streamCategories = [
    { value: "Movie Premiere", label: "Movie Premiere" },
    { value: "Episode Premiere", label: "Episode Premiere" },
    { value: "Behind the Scenes", label: "Behind the Scenes" },
    { value: "Cast Interview", label: "Cast Interview" },
    { value: "Director Commentary", label: "Director Commentary" },
    { value: "Fan Q&A", label: "Fan Q&A" },
    { value: "Special Event", label: "Special Event" },
  ];

  const handleCreateStream = async (e) => {
    e.preventDefault();
    if (!newStream.title || !newStream.startTime) {
      showToast.error("Please fill in all required fields");
      return;
    }

    try {
      const streamData = {
        ...newStream,
        tvShowId: tvShow?.id,
        tvShowTitle: tvShow?.title,
        thumbnail:
          newStream.thumbnail ||
          tvShow?.poster ||
          "https://via.placeholder.com/300x200/E5E7EB/9CA3AF?text=Live+Stream",
      };

      await onCreateStream(streamData);
      setNewStream({
        title: "",
        description: "",
        category: "Movie Premiere",
        startTime: "",
        duration: "",
        thumbnail: null,
      });
      setActiveTab("manage");
    } catch (error) {
      showToast.error("Error creating stream: " + error.message);
    }
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewStream((prev) => ({
          ...prev,
          [field]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Live Streaming Management
              </h2>
              {tvShow && (
                <p className="text-sm text-gray-600 mt-1">
                  For: {tvShow.title}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "create"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Create Stream
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "manage"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Manage Streams ({existingStreams.length})
            </button>
          </div>

          {/* Create Stream Tab */}
          {activeTab === "create" && (
            <form onSubmit={handleCreateStream} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Stream Title *"
                  value={newStream.title}
                  onChange={(e) =>
                    setNewStream({ ...newStream, title: e.target.value })
                  }
                  placeholder="Enter stream title"
                  required
                />

                <Select
                  label="Category"
                  value={newStream.category}
                  onChange={(value) =>
                    setNewStream({ ...newStream, category: value })
                  }
                  options={streamCategories}
                />

                <Input
                  label="Start Time *"
                  type="datetime-local"
                  value={newStream.startTime}
                  onChange={(e) =>
                    setNewStream({ ...newStream, startTime: e.target.value })
                  }
                  required
                />

                <Input
                  label="Duration"
                  value={newStream.duration}
                  onChange={(e) =>
                    setNewStream({ ...newStream, duration: e.target.value })
                  }
                  placeholder="e.g., 2h 30m"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newStream.description}
                  onChange={(e) =>
                    setNewStream({ ...newStream, description: e.target.value })
                  }
                  placeholder="Enter stream description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Thumbnail (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "thumbnail")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494]"
                />
                {newStream.thumbnail && (
                  <img
                    src={newStream.thumbnail}
                    alt="Thumbnail preview"
                    className="mt-2 w-32 h-20 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#af3494] hover:bg-[#9c2d84]"
                >
                  Create Stream
                </Button>
              </div>
            </form>
          )}

          {/* Manage Streams Tab */}
          {activeTab === "manage" && (
            <div className="space-y-4">
              {existingStreams.length === 0 ? (
                <div className="text-center py-12">
                  <Radio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No streams found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your first live stream to get started.
                  </p>
                  <Button
                    onClick={() => setActiveTab("create")}
                    className="bg-[#af3494] hover:bg-[#9c2d84]"
                  >
                    Create Stream
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {existingStreams.map((stream) => (
                    <div
                      key={stream.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={
                            stream.thumbnail ||
                            "https://via.placeholder.com/300x200/E5E7EB/9CA3AF?text=Stream"
                          }
                          alt={stream.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-900">
                              {stream.title}
                            </h3>
                            <span
                              className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-full ${getStatusColor(
                                stream.status
                              )}`}
                            >
                              {getStatusIcon(stream.status)}
                              <span className="capitalize">
                                {stream.status}
                              </span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {stream.category}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {new Date(stream.startTime).toLocaleString()}
                            </span>
                            {stream.duration && <span>{stream.duration}</span>}
                            {stream.status === "live" && (
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{stream.viewers || 0} viewers</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {stream.status === "scheduled" && (
                            <Button
                              size="sm"
                              onClick={() => onStartStream(stream.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Go Live
                            </Button>
                          )}
                          {stream.status === "live" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onStopStream(stream.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Pause className="w-4 h-4 mr-1" />
                              End Stream
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveStreamingModal;
