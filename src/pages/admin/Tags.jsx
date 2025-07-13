import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, Tag } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import Loading from "../../components/ui/Loading";
import { tagService } from "../../services/firebaseServices";

const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const tagsData = await tagService.getAllTags();
      setTags(tagsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = async (tagData) => {
    try {
      const tagId = await tagService.addTag(tagData);
      await fetchTags();
      return tagId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTag = async (tagId, tagData) => {
    try {
      await tagService.updateTag(tagId, tagData);
      await fetchTags();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTag = async (tagId) => {
    try {
      await tagService.deleteTag(tagId);
      await fetchTags();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  React.useEffect(() => {
    fetchTags();
  }, []);

  return {
    tags,
    loading,
    error,
    addTag,
    updateTag,
    deleteTag,
    fetchTags,
  };
};

const Tags = () => {
  const { tags, loading, error, addTag, updateTag, deleteTag } = useTags();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagForm, setTagForm] = useState({
    name: "",
    description: "",
    color: "#af3494",
  });

  const filteredTags = tags.filter(
    (tag) =>
      tag.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tagForm.name.trim()) {
      alert("Tag name is required");
      return;
    }

    try {
      if (editingTag) {
        await updateTag(editingTag.id, tagForm);
      } else {
        await addTag(tagForm);
      }

      setIsModalOpen(false);
      setEditingTag(null);
      setTagForm({ name: "", description: "", color: "#af3494" });
    } catch (error) {
      alert(`Failed to ${editingTag ? "update" : "add"} tag: ${error.message}`);
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setTagForm({
      name: tag.name || "",
      description: tag.description || "",
      color: tag.color || "#af3494",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (tagId) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        await deleteTag(tagId);
      } catch (error) {
        alert("Failed to delete tag: " + error.message);
      }
    }
  };

  const openAddModal = () => {
    setEditingTag(null);
    setTagForm({ name: "", description: "", color: "#af3494" });
    setIsModalOpen(true);
  };

  const breadcrumb = [
    { label: "Dashboard", href: "/admin" },
    { label: "Movies", href: "/admin/movies" },
    { label: "Tags" },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movie Tags</h1>
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
        <Button onClick={openAddModal} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Tag</span>
        </Button>
      </div>

      {/* Search and Actions */}
      <Card>
        <Card.Content>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {filteredTags.length} tag
                  {filteredTags.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Error Message */}
      {error && (
        <Card>
          <Card.Content>
            <div className="text-center py-4">
              <p className="text-red-600">Error: {error}</p>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Tags Table */}
      <Card>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>#</Table.Head>
              <Table.Head>Tag</Table.Head>
              <Table.Head>Description</Table.Head>
              <Table.Head>Color</Table.Head>
              <Table.Head>Created</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredTags.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6}>
                  <div className="text-center py-8">
                    <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm
                        ? "No tags found matching your search"
                        : "No tags created yet"}
                    </p>
                    {!searchTerm && (
                      <Button
                        onClick={openAddModal}
                        className="mt-4"
                        variant="outline"
                      >
                        Create Your First Tag
                      </Button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredTags.map((tag, index) => (
                <Table.Row key={tag.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: tag.color || "#af3494" }}
                      />
                      <span className="font-medium">{tag.name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-gray-600">
                      {tag.description || "No description"}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: tag.color || "#af3494" }}
                      />
                      <span className="text-sm text-gray-500">
                        {tag.color || "#af3494"}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {tag.createdAt
                      ? new Date(
                          tag.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tag)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit tag"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(tag.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete tag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </Card>

      {/* Add/Edit Tag Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTag(null);
        }}
        title={editingTag ? "Edit Tag" : "Add New Tag"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag Name *
            </label>
            <Input
              placeholder="Enter tag name"
              value={tagForm.name}
              onChange={(e) =>
                setTagForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter tag description (optional)"
              value={tagForm.description}
              onChange={(e) =>
                setTagForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={tagForm.color}
                onChange={(e) =>
                  setTagForm((prev) => ({ ...prev, color: e.target.value }))
                }
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <Input
                value={tagForm.color}
                onChange={(e) =>
                  setTagForm((prev) => ({ ...prev, color: e.target.value }))
                }
                placeholder="#af3494"
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingTag(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingTag ? "Update Tag" : "Add Tag"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tags;
