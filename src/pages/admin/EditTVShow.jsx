import React, { useState, useEffect } from "react";
import { Upload, X, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Loading from "../../components/ui/Loading";
import { tvShowService, uploadService } from "../../services/firebaseServices";
import { useCategories } from "../../hooks/useCategories";

const EditTVShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tvShowData, setTVShowData] = useState({
    title: "",
    description: "",
    seasons: "",
    totalEpisodes: "",
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
    isOngoing: false,
    lastEpisodeDate: "",
    network: "",
    imdbRating: "",
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
    { value: "Hindi", label: "Hindi" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Chinese", label: "Chinese" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        setLoading(true);
        const tvShow = await tvShowService.getTVShowById(id);
        if (tvShow) {
          setTVShowData({
            ...tvShow,
            cast: Array.isArray(tvShow.cast)
              ? tvShow.cast.join(", ")
              : tvShow.cast || "",
            seasons: tvShow.seasons?.toString() || "",
            totalEpisodes: tvShow.totalEpisodes?.toString() || "",
            imdbRating: tvShow.imdbRating?.toString() || "",
            tags: tvShow.tags || [],
            language: tvShow.language || [],
          });
        } else {
          showToast.error("TV Show not found");
          navigate("/admin/tv-shows");
        }
      } catch (error) {
        showToast.error("Error loading TV show: " + error.message);
        navigate("/admin/tv-shows");
      } finally {
        setLoading(false);
      }
    };

    fetchTVShow();
  }, [id, navigate]);

  const handleInputChange = (field, value) => {
    setTVShowData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (file, type) => {
    setTVShowData((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const addTag = (newTag) => {
    if (newTag.trim() && !tvShowData.tags.includes(newTag.trim())) {
      setTVShowData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setTVShowData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!tvShowData.title || !tvShowData.description) {
        showToast.error("Please fill in all required fields");
        return;
      }

      const dataToSave = {
        ...tvShowData,
        seasons: parseInt(tvShowData.seasons) || 0,
        totalEpisodes: parseInt(tvShowData.totalEpisodes) || 0,
        imdbRating: parseFloat(tvShowData.imdbRating) || 0,
        cast:
          typeof tvShowData.cast === "string"
            ? tvShowData.cast
                .split(",")
                .map((c) => c.trim())
                .filter((c) => c)
            : tvShowData.cast,
      };

      // Handle file uploads for new images
      if (tvShowData.poster && typeof tvShowData.poster === "object") {
        dataToSave.poster = await uploadService.uploadImage(
          tvShowData.poster,
          `tv-shows/posters/${Date.now()}`
        );
      }

      if (tvShowData.thumbnail && typeof tvShowData.thumbnail === "object") {
        dataToSave.thumbnail = await uploadService.uploadImage(
          tvShowData.thumbnail,
          `tv-shows/thumbnails/${Date.now()}`
        );
      }

      await tvShowService.updateTVShow(id, dataToSave);
      navigate("/admin/tv-shows");
    } catch (error) {
      showToast.error("Error updating TV show: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "TV Shows", href: "/admin/tv-shows" },
    { label: "Edit TV Show" },
  ];

  if (loading) return <Loading />;

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
            Edit TV Show
          </h1>
        </div>
        <Link
          to="/admin/tv-shows"
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to TV Shows
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="TV Show Title *"
                    value={tvShowData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter TV show title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
                    rows={4}
                    value={tvShowData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter TV show description"
                  />
                </div>
                <Input
                  label="Number of Seasons"
                  type="number"
                  value={tvShowData.seasons}
                  onChange={(e) => handleInputChange("seasons", e.target.value)}
                  placeholder="e.g., 5"
                />
                <Input
                  label="Total Episodes"
                  type="number"
                  value={tvShowData.totalEpisodes}
                  onChange={(e) =>
                    handleInputChange("totalEpisodes", e.target.value)
                  }
                  placeholder="e.g., 62"
                />
                <Input
                  label="Release Date"
                  type="date"
                  value={tvShowData.releaseDate}
                  onChange={(e) =>
                    handleInputChange("releaseDate", e.target.value)
                  }
                />
                <Input
                  label="Last Episode Date"
                  type="date"
                  value={tvShowData.lastEpisodeDate}
                  onChange={(e) =>
                    handleInputChange("lastEpisodeDate", e.target.value)
                  }
                />
                <Input
                  label="Director"
                  value={tvShowData.director}
                  onChange={(e) =>
                    handleInputChange("director", e.target.value)
                  }
                  placeholder="Enter director name"
                />
                <Input
                  label="Network/Platform"
                  value={tvShowData.network}
                  onChange={(e) => handleInputChange("network", e.target.value)}
                  placeholder="e.g., Netflix, HBO"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Cast (comma separated)"
                    value={tvShowData.cast}
                    onChange={(e) => handleInputChange("cast", e.target.value)}
                    placeholder="Actor 1, Actor 2, Actor 3"
                  />
                </div>
                <Input
                  label="IMDb Rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={tvShowData.imdbRating}
                  onChange={(e) =>
                    handleInputChange("imdbRating", e.target.value)
                  }
                  placeholder="e.g., 8.5"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isOngoing"
                    checked={tvShowData.isOngoing}
                    onChange={(e) =>
                      handleInputChange("isOngoing", e.target.checked)
                    }
                    className="w-4 h-4 text-[#af3494] border-gray-300 rounded focus:ring-[#af3494]"
                  />
                  <label
                    htmlFor="isOngoing"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Ongoing Series
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Media Information */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Media Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  value={tvShowData.category}
                  onChange={(value) => handleInputChange("category", value)}
                  options={categories.map((cat) => ({
                    value: cat.name,
                    label: cat.name,
                  }))}
                  placeholder="Select category"
                />
                <Select
                  label="Quality"
                  value={tvShowData.quality}
                  onChange={(value) => handleInputChange("quality", value)}
                  options={qualityOptions}
                  placeholder="Select quality"
                />
                <div className="md:col-span-2">
                  <Select
                    label="Languages"
                    value={tvShowData.language}
                    onChange={(value) => handleInputChange("language", value)}
                    options={languageOptions}
                    placeholder="Select languages"
                    multiple
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Trailer URL"
                    value={tvShowData.trailer}
                    onChange={(e) =>
                      handleInputChange("trailer", e.target.value)
                    }
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Options */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Publish Options
              </h2>
              <div className="space-y-4">
                <Select
                  label="Status"
                  value={tvShowData.status}
                  onChange={(value) => handleInputChange("status", value)}
                  options={statusOptions}
                />
                <Button
                  onClick={handleSave}
                  className="w-full"
                  disabled={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Update TV Show"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Poster Upload */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Poster Image
              </h2>
              <div className="space-y-4">
                {tvShowData.poster && (
                  <div className="space-y-2">
                    <img
                      src={
                        typeof tvShowData.poster === "string"
                          ? tvShowData.poster
                          : URL.createObjectURL(tvShowData.poster)
                      }
                      alt="Current poster"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      onClick={() => handleInputChange("poster", null)}
                      variant="outline"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleFileUpload(e.target.files[0], "poster");
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#af3494] file:text-white hover:file:bg-[#9d2d82]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {tvShowData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add tag"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditTVShow;
