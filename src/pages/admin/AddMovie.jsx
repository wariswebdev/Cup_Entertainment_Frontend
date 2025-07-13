import React, { useState } from "react";
import { Upload, X, Plus, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Loading from "../../components/ui/Loading";
import { useMovies } from "../../hooks/useMovies";
import { useCategories } from "../../hooks/useCategories";
import { uploadService } from "../../services/firebaseServices";

const AddMovie = () => {
  const navigate = useNavigate();
  const { addMovie } = useMovies();
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    duration: "",
    releaseDate: "",
    director: "",
    cast: "",
    category: "",
    quality: "",
    language: [],
    trailer: "",
    poster: null,
    thumbnail: null,
    videoFile: null,
    tags: [],
    status: "draft",
  });

  const [dragActive, setDragActive] = useState(false);
  const [newTag, setNewTag] = useState("");

  // Language options
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Chinese", label: "Chinese" },
  ];

  // Static options
  const qualityOptions = [
    { value: "HD", label: "HD" },
    { value: "FHD", label: "Full HD" },
    { value: "4K", label: "4K" },
    { value: "8K", label: "8K" },
  ];

  const handleInputChange = (field, value) => {
    setMovieData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (file, type) => {
    setMovieData((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], "videoFile");
    }
  };

  const handleSave = async (saveAsPublished = false) => {
    try {
      setLoading(true);

      // Validate required fields
      const requiredFields = {
        title: "Movie title",
        description: "Description",
        duration: "Duration",
        releaseDate: "Release date",
        director: "Director",
        cast: "Cast members",
        category: "Category",
        quality: "Quality",
        language: "Language",
      };

      const missingFields = Object.entries(requiredFields).filter(
        ([field, label]) =>
          !movieData[field] ||
          (Array.isArray(movieData[field]) && movieData[field].length === 0) ||
          (field === "cast" && !movieData[field].trim())
      );

      if (missingFields.length > 0) {
        alert(
          `Please fill in the following required fields:\n${missingFields
            .map(([_, label]) => `- ${label}`)
            .join("\n")}`
        );
        return;
      }

      // Validate images for published movies
      if (saveAsPublished && (!movieData.poster || !movieData.thumbnail)) {
        alert("Poster and thumbnail images are required for published movies");
        return;
      }

      // Prepare movie data
      const movieToSave = {
        ...movieData,
        status: saveAsPublished ? "Active" : "Draft",
        category: movieData.category, // Single category
        language: Array.isArray(movieData.language)
          ? movieData.language
          : [movieData.language].filter(Boolean),
        cast: movieData.cast
          .split(",")
          .map((actor) => actor.trim())
          .filter(Boolean),
        tags: movieData.tags || [],
      };

      // Upload files if they exist
      if (movieData.poster) {
        const posterUrl = await uploadService.uploadImage(
          movieData.poster,
          "posters"
        );
        movieToSave.poster = posterUrl;
      }

      if (movieData.thumbnail) {
        const thumbnailUrl = await uploadService.uploadImage(
          movieData.thumbnail,
          "thumbnails"
        );
        movieToSave.thumbnail = thumbnailUrl;
      }

      // Skip video file upload for now (too large for base64)
      if (movieData.videoFile) {
        // Just store the file name for reference
        movieToSave.videoFileName = movieData.videoFile.name;
        movieToSave.videoSize = movieData.videoFile.size;
      }

      // Remove file objects from data
      delete movieToSave.videoFile;

      await addMovie(movieToSave);
      alert("Movie saved successfully!");
      navigate("/admin/movies");
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("Failed to save movie: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !movieData.tags.includes(newTag.trim())) {
      setMovieData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setMovieData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleLanguageChange = (selectedOptions) => {
    setMovieData((prev) => ({
      ...prev,
      language: selectedOptions || [],
    }));
  };

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "Movies", href: "/admin/movies" },
    { label: "Add New Movie" },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Link to="/admin/movies">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Movies</span>
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Movie</h1>
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
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => handleSave(true)}
            disabled={loading}
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Publishing..." : "Publish Movie"}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <Card.Header>
              <Card.Title>Basic Information</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Movie Title *
                  </label>
                  <Input
                    placeholder="Enter movie title"
                    value={movieData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter movie description"
                    value={movieData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <Input
                      placeholder="e.g., 2h 30m"
                      value={movieData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Release Date *
                    </label>
                    <Input
                      type="date"
                      value={movieData.releaseDate}
                      onChange={(e) =>
                        handleInputChange("releaseDate", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Director *
                    </label>
                    <Input
                      placeholder="Director name"
                      value={movieData.director}
                      onChange={(e) =>
                        handleInputChange("director", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cast *
                    </label>
                    <Input
                      placeholder="Main cast (comma separated)"
                      value={movieData.cast}
                      onChange={(e) =>
                        handleInputChange("cast", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trailer URL
                  </label>
                  <Input
                    placeholder="YouTube or video URL"
                    value={movieData.trailer}
                    onChange={(e) =>
                      handleInputChange("trailer", e.target.value)
                    }
                  />
                </div>

                {/* Tags Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleTagAdd()}
                      />
                      <Button
                        type="button"
                        onClick={handleTagAdd}
                        variant="outline"
                        className="flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </Button>
                    </div>
                    {movieData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {movieData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 text-sm bg-[#af3494]/10 text-[#af3494] rounded-full"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleTagRemove(tag)}
                              className="ml-2 text-[#af3494] hover:text-[#9c2d84]"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Video Upload */}
          <Card>
            <Card.Header>
              <Card.Title>Movie File</Card.Title>
            </Card.Header>
            <Card.Content>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-[#af3494] bg-[#af3494]/5"
                    : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload Movie File
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop your movie file here, or click to browse
                </p>
                <Button variant="outline">Choose File</Button>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: MP4, AVI, MKV (Max size: 5GB)
                </p>
                {movieData.videoFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      File selected: {movieData.videoFile.name}
                    </p>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories & Genres */}
          <Card>
            <Card.Header>
              <Card.Title>Categories & Genres</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <Select
                    options={categories.map((cat) => ({
                      value: cat.name,
                      label: cat.name,
                    }))}
                    value={movieData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    placeholder="Select Category"
                    required
                  />
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Media Settings */}
          <Card>
            <Card.Header>
              <Card.Title>Media Settings</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quality *
                  </label>
                  <Select
                    options={qualityOptions}
                    value={movieData.quality}
                    onChange={(e) =>
                      handleInputChange("quality", e.target.value)
                    }
                    placeholder="Select Quality"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language *
                  </label>
                  <Select
                    options={languageOptions}
                    value={movieData.language[0] || ""}
                    onChange={(e) =>
                      handleInputChange("language", [e.target.value])
                    }
                    placeholder="Select Language"
                    required
                  />
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Poster & Thumbnail */}
          <Card>
            <Card.Header>
              <Card.Title>Poster & Thumbnail *</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Movie Poster *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {movieData.poster ? (
                      <div className="space-y-2">
                        <img
                          src={URL.createObjectURL(movieData.poster)}
                          alt="Poster preview"
                          className="w-24 h-32 object-cover mx-auto rounded"
                        />
                        <p className="text-sm text-green-600">
                          {movieData.poster.name}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange("poster", null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">
                          Upload poster image *
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document.getElementById("poster-upload").click()
                          }
                        >
                          Choose Image
                        </Button>
                        <input
                          id="poster-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              handleInputChange("poster", file);
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {movieData.thumbnail ? (
                      <div className="space-y-2">
                        <img
                          src={URL.createObjectURL(movieData.thumbnail)}
                          alt="Thumbnail preview"
                          className="w-20 h-14 object-cover mx-auto rounded"
                        />
                        <p className="text-sm text-green-600">
                          {movieData.thumbnail.name}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange("thumbnail", null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 mb-2">
                          Upload thumbnail *
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document.getElementById("thumbnail-upload").click()
                          }
                        >
                          Choose Image
                        </Button>
                        <input
                          id="thumbnail-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              handleInputChange("thumbnail", file);
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
