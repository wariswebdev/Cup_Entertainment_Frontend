import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  FileText,
  Download,
  Copy,
  Search,
  MoreHorizontal,
  Trash2,
  Edit,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";
import Loading from "../../components/ui/Loading";
import { useMovies } from "../../hooks/useMovies";
import { useCategories } from "../../hooks/useCategories";

const AllMovies = () => {
  const { movies, loading, error, deleteMovie } = useMovies();
  const { categories } = useCategories();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    fromDate: "",
    toDate: "",
    quality: "",
    status: "",
  });
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);

  // Static options for now
  const qualityOptions = [
    { value: "HD", label: "HD" },
    { value: "FHD", label: "Full HD" },
    { value: "4K", label: "4K" },
    { value: "8K", label: "8K" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Draft", label: "Draft" },
  ];

  useEffect(() => {
    let filtered = movies;

    // Apply filters
    if (filters.title) {
      filtered = filtered.filter((movie) =>
        movie.title?.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (movie) => movie.category === filters.category
      );
    }

    if (filters.quality) {
      filtered = filtered.filter((movie) => movie.quality === filters.quality);
    }

    if (filters.status) {
      filtered = filtered.filter((movie) => movie.status === filters.status);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.genre?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [movies, filters, searchTerm]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading movies: {error}</p>
      </div>
    );
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      category: "",
      fromDate: "",
      toDate: "",
      quality: "",
      status: "",
    });
    setSearchTerm("");
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(movieId);
      } catch (error) {
        alert("Failed to delete movie: " + error.message);
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "Movies", href: "/admin/movies" },
    { label: "All Movies" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Movies</h1>
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
        <Link to="/admin/movies/add">
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Movie</span>
          </Button>
        </Link>
      </div>

      {/* Filters Card */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="p-1"
            >
              {filtersExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </Card.Header>

        {filtersExpanded && (
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  placeholder="Enter movie title"
                  value={filters.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select
                  options={categories.map((cat) => ({
                    value: cat.name,
                    label: cat.name,
                  }))}
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  placeholder="Select Category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <Input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) =>
                    handleFilterChange("fromDate", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <Input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleFilterChange("toDate", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quality
                </label>
                <Select
                  options={qualityOptions}
                  value={filters.quality}
                  onChange={(e) =>
                    handleFilterChange("quality", e.target.value)
                  }
                  placeholder="Select Quality"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  options={statusOptions}
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  placeholder="Select Status"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filter
              </Button>
              <Button>Filter</Button>
            </div>
          </Card.Content>
        )}
      </Card>

      {/* Actions and Search */}
      <Card>
        <Card.Content>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Excel</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </Button>
            </div>

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Movies Table */}
      <Card>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>#</Table.Head>
              <Table.Head>Title</Table.Head>
              <Table.Head>Categories</Table.Head>
              <Table.Head>Quality</Table.Head>
              <Table.Head>Language</Table.Head>
              <Table.Head>Publish Date</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Action</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentMovies.map((movie, index) => (
              <Table.Row key={movie.id}>
                <Table.Cell>{startIndex + index + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={movie.poster || "/api/placeholder/48/64"}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{movie.title}</p>
                      <p className="text-sm text-gray-500">
                        {movie.duration || "N/A"}
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-1">
                    {(movie.categories || [movie.category])
                      .filter(Boolean)
                      .map((category, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {category}
                        </span>
                      ))}
                  </div>
                </Table.Cell>
                <Table.Cell>{movie.quality || "HD"}</Table.Cell>
                <Table.Cell>
                  {Array.isArray(movie.language)
                    ? movie.language.join(", ")
                    : movie.language || "English"}
                </Table.Cell>
                <Table.Cell>
                  {movie.publishDate ||
                    new Date(movie.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      movie.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : movie.status === "Draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {movie.status || "Active"}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-2">
                    <Link to={`/admin/movies/edit/${movie.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteMovie(movie.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredMovies.length)} of{" "}
            {filteredMovies.length} results
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </Button>
            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 pt-4">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-700">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-700">
            Terms of Use
          </a>
        </div>
        <p>© 2025 csprepforum. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default AllMovies;
