import React, { useState, useEffect } from "react";
import { Upload, X, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Loading from "../../components/ui/Loading";
import { movieService, uploadService } from "../../services/firebaseServices";
import { useCategories } from "../../hooks/useCategories";

const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const { tagService } = await import("../../services/firebaseServices");
      const tagsData = await tagService.getAllTags();
      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, loading };
};

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { tags } = useTags();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    tags: [],
    status: "draft",
  });

  // Static options
  const qualityOptions = [
    { value: "HD", label: "HD" },
    { value: "FHD", label: "Full HD" },
    { value: "4K", label: "4K" },
    { value: "8K", label: "8K" },
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Italian", label: "Italian" },
    { value: "Hindi", label: "Hindi" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Portuguese", label: "Portuguese" },
  ];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await movieService.getMovieById(id);
        if (movie) {
          setMovieData({
            ...movie,
            cast: Array.isArray(movie.cast)
              ? movie.cast.join(", ")
              : movie.cast || "",
            language: Array.isArray(movie.language)
              ? movie.language
              : [movie.language].filter(Boolean),
            tags: movie.tags || [],
          });
        } else {
          alert("Movie not found");
          navigate("/admin/movies");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        alert("Error loading movie: " + error.message);
        navigate("/admin/movies");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id, navigate]);

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

  const handleSave = async (saveAsPublished = false) => {
    try {
      setSaving(true);

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

      // Prepare movie data
      const movieToSave = {
        ...movieData,
        status: saveAsPublished ? "Active" : movieData.status,
        categories: Array.isArray(movieData.categories)
          ? movieData.categories
          : [movieData.categories].filter(Boolean),
        language: Array.isArray(movieData.language)
          ? movieData.language
          : [movieData.language].filter(Boolean),
        cast: movieData.cast
          .split(",")
          .map((actor) => actor.trim())
          .filter(Boolean),
        tags: movieData.tags || [],
      };

      // Upload new files if they exist
      if (movieData.poster && typeof movieData.poster !== "string") {
        const posterUrl = await uploadService.uploadImage(
          movieData.poster,
          "posters"
        );
        movieToSave.poster = posterUrl;
      }

      if (movieData.thumbnail && typeof movieData.thumbnail !== "string") {
        const thumbnailUrl = await uploadService.uploadImage(
          movieData.thumbnail,
          "thumbnails"
        );
        movieToSave.thumbnail = thumbnailUrl;
      }

      await movieService.updateMovie(id, movieToSave);
      alert("Movie updated successfully!");
      navigate("/admin/movies");
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update movie: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "Movies", href: "/admin/movies" },
    { label: "Edit Movie" },
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Movie</h1>
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
            disabled={saving}
          >
            {saving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => handleSave(true)}
            disabled={saving}
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing..." : "Update & Publish"}</span>
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
                      placeholder="Enter director name"
                      value={movieData.director}
                      onChange={(e) =>
                        handleInputChange("director", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cast Members *
                    </label>
                    <Input
                      placeholder="Actor 1, Actor 2, Actor 3"
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
                    placeholder="https://youtube.com/watch?v=..."
                    value={movieData.trailer}
                    onChange={(e) =>
                      handleInputChange("trailer", e.target.value)
                    }
                  />
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Media Upload */}
          <Card>
            <Card.Header>
              <Card.Title>Media Files</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-6">
                {/* Poster Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Movie Poster *
                  </label>
                  <div className="flex items-start space-x-4">
                    {movieData.poster && (
                      <div className="relative">
                        <img
                          src={
                            typeof movieData.poster === "string"
                              ? movieData.poster
                              : URL.createObjectURL(movieData.poster)
                          }
                          alt="Poster"
                          className="w-24 h-36 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => handleInputChange("poster", null)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files[0] &&
                          handleFileUpload(e.target.files[0], "poster")
                        }
                        className="hidden"
                        id="poster-upload"
                      />
                      <label
                        htmlFor="poster-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload poster image
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail *
                  </label>
                  <div className="flex items-start space-x-4">
                    {movieData.thumbnail && (
                      <div className="relative">
                        <img
                          src={
                            typeof movieData.thumbnail === "string"
                              ? movieData.thumbnail
                              : URL.createObjectURL(movieData.thumbnail)
                          }
                          alt="Thumbnail"
                          className="w-32 h-20 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => handleInputChange("thumbnail", null)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files[0] &&
                          handleFileUpload(e.target.files[0], "thumbnail")
                        }
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload thumbnail image
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Movie Details */}
          <Card>
            <Card.Header>
              <Card.Title>Movie Details</Card.Title>
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
                  <select
                    multiple
                    value={movieData.language}
                    onChange={(e) => {
                      const selectedLanguages = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      handleInputChange("language", selectedLanguages);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
                    required
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple languages
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <select
                    multiple
                    value={movieData.tags}
                    onChange={(e) => {
                      const selectedTags = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      handleInputChange("tags", selectedTags);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
                  >
                    {tags.map((tag) => (
                      <option key={tag.id} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple tags
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Publishing */}
          <Card>
            <Card.Header>
              <Card.Title>Publishing</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Select
                    options={[
                      { value: "Draft", label: "Draft" },
                      { value: "Active", label: "Published" },
                      { value: "Inactive", label: "Inactive" },
                    ]}
                    value={movieData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                  />
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
