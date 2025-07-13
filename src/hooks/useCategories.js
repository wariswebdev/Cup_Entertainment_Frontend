import { useState, useEffect } from "react";
import { categoryService } from "../services/firebaseServices";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await categoryService.getAllCategories();
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const categoryId = await categoryService.addCategory(categoryData);
      await fetchCategories(); // Refresh the list
      return categoryId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    try {
      await categoryService.updateCategory(categoryId, categoryData);
      await fetchCategories(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await categoryService.deleteCategory(categoryId);
      await fetchCategories(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: fetchCategories,
  };
};
