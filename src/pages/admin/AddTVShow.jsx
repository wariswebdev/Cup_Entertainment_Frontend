import React, { useState } from "react";
import { Upload, X, Plus, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Loading from "../../components/ui/Loading";
import { useTVShows } from "../../hooks/useTVShows";
import { useCategories } from "../../hooks/useCategories";
import { uploadService } from "../../services/firebaseServices";
import { showToast } from "../../utils/notifications";

const AddTVShow = () => {
  const navigate = useNavigate();
  const { addTVShow } = useTVShows();
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
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

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

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
      handleFileUpload(e.dataTransfer.files[0], "poster");
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tvShowData.tags.includes(newTag.trim())) {
      setTVShowData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTVShowData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSave = async (saveAsPublished = false) => {
    try {
      setLoading(true);

      // Validate required fields
      if (!tvShowData.title || !tvShowData.description) {
        showToast.error("Please fill in all required fields");
        return;
      }

      const dataToSave = {
        ...tvShowData,
        status: saveAsPublished ? "active" : tvShowData.status,
        seasons: parseInt(tvShowData.seasons) || 0,
        totalEpisodes: parseInt(tvShowData.totalEpisodes) || 0,
        imdbRating: parseFloat(tvShowData.imdbRating) || 0,
      };

      // Handle file uploads
      if (tvShowData.poster) {
        dataToSave.poster = await uploadService.uploadImage(
          tvShowData.poster,
          `tv-shows/posters/${Date.now()}`
        );
      }

      if (tvShowData.thumbnail) {
        dataToSave.thumbnail = await uploadService.uploadImage(
          tvShowData.thumbnail,
          `tv-shows/thumbnails/${Date.now()}`
        );
      }

      // Remove file objects from data
      delete dataToSave.poster;
      delete dataToSave.thumbnail;

      await addTVShow(dataToSave);
      navigate("/admin/tv-shows");
    } catch (error) {
      showToast.error("Error saving TV show: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "TV Shows", href: "/admin/tv-shows" },
    { label: "Add New Show" },
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
          <h1 className="text-2xl font-bold text-gray-900">Add New TV Show</h1>
        </div>
        <Link
          to="/admin/tv-shows"
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleSave(false)}
                    variant="outline"
                    className="flex-1"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={() => handleSave(true)}
                    className="flex-1"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Poster Upload */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Poster Image
              </h2>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive
                    ? "border-[#af3494] bg-purple-50"
                    : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {tvShowData.poster ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(tvShowData.poster)}
                      alt="Poster preview"
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
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">
                      Drop poster image here or{" "}
                      <button
                        type="button"
                        className="text-[#af3494] hover:underline"
                        onClick={() =>
                          document.getElementById("poster-input").click()
                        }
                      >
                        browse
                      </button>
                    </p>
                    <input
                      id="poster-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleFileUpload(e.target.files[0], "poster");
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
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
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddTVShow;
