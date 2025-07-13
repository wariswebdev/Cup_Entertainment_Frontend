import { useState, useEffect } from "react";
import { userService } from "../services/firebaseServices";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const userId = await userService.addUser(userData);
      await fetchUsers(); // Refresh the list
      return userId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      await userService.updateUser(userId, userData);
      await fetchUsers(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      await fetchUsers(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    refreshUsers: fetchUsers,
  };
};
