import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  MoreHorizontal,
  Shield,
  Ban,
  Trash2,
  Edit,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Table from "../../components/ui/Table";
import Loading from "../../components/ui/Loading";
import { useUsers } from "../../hooks/useUsers";

const UserManagement = () => {
  const { users, loading, error, deleteUser } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
      } catch (error) {
        alert('Failed to delete user: ' + error.message);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading users: {error}</p>
      </div>
    );
  }

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Moderator", label: "Moderator" },
    { value: "User", label: "User" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Suspended", label: "Suspended" },
  ];

  const subscriptionOptions = [
    { value: "Free", label: "Free" },
    { value: "Basic", label: "Basic" },
    { value: "Premium", label: "Premium" },
  ];

  const handleUserStatusChange = (userId, newStatus) => {
    // This would typically call an update service
    console.log('Status change:', userId, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-[#af3494]/10 text-[#af3494]";
      case "Moderator":
        return "bg-blue-100 text-blue-800";
      case "User":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "Active").length,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Premium Users",
      value: users.filter((u) => u.subscription === "Premium").length,
      icon: Shield,
      color: "text-[#af3494]",
    },
    {
      title: "Suspended",
      value: users.filter((u) => u.status === "Suspended").length,
      icon: Ban,
      color: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              options={roleOptions}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              placeholder="Filter by Role"
            />

            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Filter by Status"
            />

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Users Table */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title>All Users ({filteredUsers.length})</Card.Title>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
            </div>
          </div>
        </Card.Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>
                <input type="checkbox" className="rounded" />
              </Table.Head>
              <Table.Head>User</Table.Head>
              <Table.Head>Contact</Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Subscription</Table.Head>
              <Table.Head>Join Date</Table.Head>
              <Table.Head>Last Login</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <input type="checkbox" className="rounded" />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=af3494&color=fff`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name || 'Unknown User'}</p>
                      <p className="text-sm text-gray-500">ID: {user.id}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user.email || 'No email'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user.phone || 'No phone'}
                      </span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getRoleColor(
                      user.role || 'User'
                    )}`}
                  >
                    {user.role || 'User'}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      user.status || 'Active'
                    )}`}
                  >
                    {user.status || 'Active'}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      (user.subscription || 'Free') === "Premium"
                        ? "bg-yellow-100 text-yellow-800"
                        : (user.subscription || 'Free') === "Basic"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.subscription || 'Free'}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-gray-600">
                    {user.joinDate || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A')}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-gray-600">
                    {user.lastLogin || 'Never'}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit User"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
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
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#af3494]/10 text-[#af3494]"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};


export default UserManagement;
