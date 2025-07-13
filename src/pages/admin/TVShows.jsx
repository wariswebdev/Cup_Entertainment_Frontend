import React, { useState } from "react";
import {
  Tv,
  Plus,
  Search,
  Filter,
  Eye,
  Calendar,
  Star,
  MoreHorizontal,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([
    {
      id: 1,
      title: "Breaking Bad",
      seasons: 5,
      episodes: 62,
      categories: ["Drama", "Crime"],
      quality: "1080p",
      language: ["English"],
      publishDate: "2008-01-20",
      status: "completed",
      rating: 9.5,
      poster: "https://via.placeholder.com/60x80/FF6B6B/FFFFFF?text=BB",
      lastEpisode: "2013-09-29",
      views: "2.5M",
    },
    {
      id: 2,
      title: "Stranger Things",
      seasons: 4,
      episodes: 42,
      categories: ["Sci-Fi", "Horror"],
      quality: "4K",
      language: ["English"],
      publishDate: "2016-07-15",
      status: "ongoing",
      rating: 8.7,
      poster: "https://via.placeholder.com/60x80/4ECDC4/FFFFFF?text=ST",
      lastEpisode: "2022-07-01",
      views: "3.1M",
    },
    {
      id: 3,
      title: "The Office",
      seasons: 9,
      episodes: 201,
      categories: ["Comedy"],
      quality: "720p",
      language: ["English"],
      publishDate: "2005-03-24",
      status: "completed",
      rating: 8.9,
      poster: "https://via.placeholder.com/60x80/45B7D1/FFFFFF?text=TO",
      lastEpisode: "2013-05-16",
      views: "1.8M",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const categoryOptions = [
    { value: "Drama", label: "Drama" },
    { value: "Comedy", label: "Comedy" },
    { value: "Action", label: "Action" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Horror", label: "Horror" },
    { value: "Crime", label: "Crime" },
  ];

  const statusOptions = [
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "hiatus", label: "On Hiatus" },
  ];

  const filteredShows = tvShows.filter((show) => {
    const matchesSearch = show.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filterCategory || show.categories.includes(filterCategory);
    const matchesStatus = !filterStatus || show.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "hiatus":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    {
      title: "Total Shows",
      value: tvShows.length,
      icon: Tv,
      color: "text-blue-600",
    },
    {
      title: "Ongoing Shows",
      value: tvShows.filter((s) => s.status === "ongoing").length,
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Total Episodes",
      value: tvShows.reduce((sum, show) => sum + show.episodes, 0),
      icon: Eye,
      color: "text-[#af3494]",
    },
    {
      title: "Avg Rating",
      value: (
        tvShows.reduce((sum, show) => sum + show.rating, 0) / tvShows.length
      ).toFixed(1),
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "TV Shows" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TV Shows</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#af3494] hover:text-[#9c2d84]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-500">{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <span className="mx-2">›</span>
                )}
              </span>
            ))}
          </nav>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add TV Show</span>
        </Button>
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

      {/* Filters */}
      <Card>
        <Card.Content>
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
              options={categoryOptions}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              placeholder="Filter by Category"
            />

            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              placeholder="Filter by Status"
            />

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Shows Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredShows.map((show) => (
          <Card key={show.id} className="hover:shadow-lg transition-shadow">
            <Card.Content>
              <div className="aspect-[3/4] mb-4 relative">
                <img
                  src={show.poster}
                  alt={show.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      show.status
                    )}`}
                  >
                    {show.status}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{show.title}</h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Seasons:</span>
                  <span className="font-medium">{show.seasons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Episodes:</span>
                  <span className="font-medium">{show.episodes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{show.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {show.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {show.views} views
                </span>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Shows Table */}
      <Card>
        <Card.Header>
          <Card.Title>All TV Shows ({filteredShows.length})</Card.Title>
        </Card.Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>#</Table.Head>
              <Table.Head>Show</Table.Head>
              <Table.Head>Seasons/Episodes</Table.Head>
              <Table.Head>Categories</Table.Head>
              <Table.Head>Quality</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Rating</Table.Head>
              <Table.Head>Views</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredShows.map((show, index) => (
              <Table.Row key={show.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={show.poster}
                      alt={show.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{show.title}</p>
                      <p className="text-sm text-gray-500">
                        Started: {show.publishDate}
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-center">
                    <p className="font-medium">{show.seasons} Seasons</p>
                    <p className="text-sm text-gray-500">
                      {show.episodes} Episodes
                    </p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-1">
                    {show.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell>{show.quality}</Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      show.status
                    )}`}
                  >
                    {show.status}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{show.rating}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>{show.views}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};

export default TVShows;
