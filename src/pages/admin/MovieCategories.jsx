import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Tag } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import Loading from "../../components/ui/Loading";
import { useCategories } from "../../hooks/useCategories";

const MovieCategories = () => {
  const {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#af3494",
  });

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setFormData({ name: "", description: "", color: "#af3494" });
    setSelectedCategory(null);
    setShowAddModal(true);
  };

  const handleEditCategory = (category) => {
    setFormData({
      name: category.name,
      description: category.description || "",
      color: category.color || "#af3494",
    });
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleSaveCategory = async () => {
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setSaving(true);
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, formData);
      } else {
        await addCategory(formData);
      }
      setShowAddModal(false);
      setShowEditModal(false);
      setFormData({ name: "", description: "", color: "#af3494" });
      setSelectedCategory(null);
    } catch (error) {
      alert("Error saving category: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
      } catch (error) {
        alert("Error deleting category: " + error.message);
      }
    }
  };

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "Movies", href: "/admin/movies" },
    { label: "Categories" },
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading categories: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movie Categories</h1>
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
        <Button
          onClick={handleAddCategory}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <Card.Content>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card.Content>
      </Card>

      {/* Categories Table */}
      <Card>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>#</Table.Head>
              <Table.Head>Category</Table.Head>
              <Table.Head>Description</Table.Head>
              <Table.Head>Movies Count</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredCategories.map((category, index) => (
              <Table.Row key={category.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color || "#af3494" }}
                    ></div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-gray-600">
                    {category.description || "No description"}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                    {category.movieCount || 0} movies
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 text-red-600 hover:text-red-800"
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

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "No categories match your search."
                : "Get started by creating your first category."}
            </p>
            {!searchTerm && (
              <Button onClick={handleAddCategory}>Create Category</Button>
            )}
          </div>
        )}
      </Card>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Category"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <Input
              placeholder="Enter category name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter category description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                placeholder="#af3494"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory} disabled={saving}>
              {saving ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Category"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <Input
              placeholder="Enter category name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter category description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                placeholder="#af3494"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory} disabled={saving}>
              {saving ? "Updating..." : "Update Category"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MovieCategories;
