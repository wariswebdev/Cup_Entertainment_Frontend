import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Star,
  Tv,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Radio,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";
import StatsCard from "../../components/ui/StatsCard";
import Loading from "../../components/ui/Loading";
import { showToast, showAlert } from "../../utils/notifications";
import { useTVShows } from "../../hooks/useTVShows";
import { useCategories } from "../../hooks/useCategories";
import { useLiveStreaming } from "../../hooks/useLiveStreaming";
import LiveStreamingModal from "../../components/streaming/LiveStreamingModal";
import LiveStreamIndicator from "../../components/streaming/LiveStreamIndicator";

const TVShows = () => {
  const { tvShows, loading, error, deleteTVShow } = useTVShows();
  const { categories } = useCategories();
  const {
    streams,
    addStream,
    startStream,
    stopStream,
    getLiveStreams,
    getStreamsByTVShow,
  } = useLiveStreaming();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showStreamingModal, setShowStreamingModal] = useState(false);
  const [selectedTVShow, setSelectedTVShow] = useState(null);

  const statusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "hiatus", label: "On Hiatus" },
    { value: "draft", label: "Draft" },
    { value: "inactive", label: "Inactive" },
  ];

  // Filter TV shows based on search and filters
  const filteredShows = tvShows.filter((show) => {
    const matchesSearch = show.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || show.category === filterCategory;
    const matchesStatus = !filterStatus || show.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShows = filteredShows.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
      case "active":
        return "text-green-600 bg-green-100";
      case "completed":
        return "text-blue-600 bg-blue-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      case "hiatus":
        return "text-yellow-600 bg-yellow-100";
      case "draft":
        return "text-gray-600 bg-gray-100";
      case "inactive":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleDeleteTVShow = async (showId) => {
    const result = await showAlert.confirm(
      "Are you sure you want to delete this TV show?",
      "This action cannot be undone"
    );

    if (result.isConfirmed) {
      try {
        await deleteTVShow(showId);
        showToast.success("TV show deleted successfully!");
      } catch (error) {
        showToast.error("Error deleting TV show: " + error.message);
      }
    }
  };

  const handleOpenStreamingModal = (tvShow) => {
    setSelectedTVShow(tvShow);
    setShowStreamingModal(true);
  };

  const handleCreateStream = async (streamData) => {
    try {
      await addStream(streamData);
      showToast.success("Stream created successfully!");
    } catch (error) {
      throw error;
    }
  };

  const handleStartStream = async (streamId) => {
    try {
      await startStream(streamId);
      showToast.success("Stream started successfully!");
    } catch (error) {
      showToast.error("Error starting stream: " + error.message);
    }
  };

  const handleStopStream = async (streamId) => {
    try {
      await stopStream(streamId);
      showToast.success("Stream stopped successfully!");
    } catch (error) {
      showToast.error("Error stopping stream: " + error.message);
    }
  };

  // Calculate stats
  const liveStreams = getLiveStreams();
  const stats = [
    {
      title: "Total Shows",
      value: tvShows.length.toString(),
      icon: Tv,
      color: "text-blue-600",
    },
    {
      title: "Ongoing Shows",
      value: tvShows
        .filter((s) => s.status === "ongoing" || s.status === "active")
        .length.toString(),
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Live Streams",
      value: liveStreams.length.toString(),
      icon: Radio,
      color: "text-red-600",
    },
    {
      title: "Avg Rating",
      value:
        tvShows.length > 0
          ? (
              tvShows.reduce((sum, show) => sum + (show.imdbRating || 0), 0) /
              tvShows.length
            ).toFixed(1)
          : "0.0",
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "TV Shows" },
  ];

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading TV shows: {error}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link to={item.href} className="hover:text-gray-700">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900">{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            TV Shows
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          {liveStreams.length > 0 && (
            <Link
              to="/admin/live-streaming"
              className="flex items-center px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium">
                {liveStreams.length} Live
              </span>
            </Link>
          )}
          <Link
            to="/admin/tv-shows/add"
            className="flex items-center px-4 py-2 bg-[#af3494] text-white rounded-md hover:bg-[#9c2d84] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add TV Show
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.color}
          />
        ))}
      </div>

      {/* Live Streams Alert */}
      {liveStreams.length > 0 && (
        <Card>
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-900">
                  {liveStreams.length} Live Stream
                  {liveStreams.length !== 1 ? "s" : ""} Active
                </h3>
                <p className="text-red-700">
                  {liveStreams
                    .map((stream) => stream.tvShowTitle || "Unknown Show")
                    .join(", ")}{" "}
                  currently streaming
                </p>
              </div>
              <Link
                to="/admin/live-streaming"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Manage Streams
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search TV shows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              options={categories.map((cat) => ({
                value: cat.name,
                label: cat.name,
              }))}
              value={filterCategory}
              onChange={(value) => setFilterCategory(value)}
              placeholder="Filter by Category"
            />

            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)}
              placeholder="Filter by Status"
            />

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("");
                setFilterStatus("");
              }}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Clear Filters</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* TV Shows Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              All TV Shows ({filteredShows.length})
            </h2>
          </div>

          {currentShows.length === 0 ? (
            <div className="text-center py-12">
              <Tv className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No TV shows found
              </h3>
              <p className="text-gray-500 mb-6">
                {tvShows.length === 0
                  ? "Get started by adding your first TV show."
                  : "Try adjusting your search or filter criteria."}
              </p>
              {tvShows.length === 0 && (
                <Link
                  to="/admin/tv-shows/add"
                  className="inline-flex items-center px-4 py-2 bg-[#af3494] text-white rounded-md hover:bg-[#9c2d84] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First TV Show
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Show
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Seasons/Episodes
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Live Streaming
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Rating
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentShows.map((show) => (
                      <tr key={show.id} className="border-t border-gray-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={
                                show.poster ||
                                "https://via.placeholder.com/60x80/E5E7EB/9CA3AF?text=No+Image"
                              }
                              alt={show.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {show.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {show.network && `${show.network} • `}
                                {show.quality}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">
                              {show.seasons || 0} Season
                              {(show.seasons || 0) !== 1 ? "s" : ""}
                            </p>
                            <p className="text-gray-500">
                              {show.totalEpisodes || 0} Episode
                              {(show.totalEpisodes || 0) !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {show.category || "Uncategorized"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              show.status
                            )}`}
                          >
                            {show.status?.charAt(0).toUpperCase() +
                              show.status?.slice(1) || "Unknown"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="min-w-[200px]">
                            <LiveStreamIndicator
                              streams={streams}
                              tvShowId={show.id}
                              compact={false}
                            />
                            <button
                              onClick={() => handleOpenStreamingModal(show)}
                              className="mt-2 text-xs text-[#af3494] hover:text-[#9c2d84] font-medium"
                            >
                              + Manage Streams
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {show.imdbRating ? (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium text-gray-900">
                                {show.imdbRating}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">N/A</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleOpenStreamingModal(show)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Live Streaming"
                            >
                              <Radio className="w-4 h-4" />
                            </button>
                            <Link
                              to={`/admin/tv-shows/edit/${show.id}`}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteTVShow(show.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1 text-gray-400 hover:text-gray-600"
                              title="More options"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredShows.length)} of{" "}
                    {filteredShows.length} results
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {getPageNumbers().map((pageNumber) => (
                      <Button
                        key={pageNumber}
                        variant={
                          currentPage === pageNumber ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Live Streaming Modal */}
      <LiveStreamingModal
        isOpen={showStreamingModal}
        onClose={() => {
          setShowStreamingModal(false);
          setSelectedTVShow(null);
        }}
        tvShow={selectedTVShow}
        onCreateStream={handleCreateStream}
        onStartStream={handleStartStream}
        onStopStream={handleStopStream}
        existingStreams={
          selectedTVShow ? getStreamsByTVShow(selectedTVShow.id) : []
        }
      />
    </div>
  );
};

export default TVShows;
