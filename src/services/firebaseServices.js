import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../config/firebase";

// Collection references
const COLLECTIONS = {
  MOVIES: "movies",
  TV_SHOWS: "tvShows",
  USERS: "users",
  CATEGORIES: "categories",
  TAGS: "tags",
  ANALYTICS: "analytics",
};

// Movies Services
export const movieService = {
  // Get all movies
  async getAllMovies() {
    try {
      const moviesCollection = collection(db, COLLECTIONS.MOVIES);
      const snapshot = await getDocs(moviesCollection);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },

  // Add new movie
  async addMovie(movieData) {
    try {
      const moviesCollection = collection(db, COLLECTIONS.MOVIES);
      const docRef = await addDoc(moviesCollection, {
        ...movieData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;
    }
  },

  // Update movie
  async updateMovie(movieId, movieData) {
    try {
      const movieDoc = doc(db, COLLECTIONS.MOVIES, movieId);
      await updateDoc(movieDoc, {
        ...movieData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
    }
  },

  // Delete movie
  async deleteMovie(movieId) {
    try {
      const movieDoc = doc(db, COLLECTIONS.MOVIES, movieId);
      await deleteDoc(movieDoc);
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  },

  // Get movie by ID
  async getMovieById(movieId) {
    try {
      const movieDoc = doc(db, COLLECTIONS.MOVIES, movieId);
      const snapshot = await getDoc(movieDoc);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      }
      return null;
    } catch (error) {
      console.error("Error fetching movie:", error);
      throw error;
    }
  },
};

// TV Shows Services
export const tvShowService = {
  async getAllTVShows() {
    try {
      const tvShowsCollection = collection(db, COLLECTIONS.TV_SHOWS);
      const snapshot = await getDocs(tvShowsCollection);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching TV shows:", error);
      throw error;
    }
  },

  async addTVShow(tvShowData) {
    try {
      const tvShowsCollection = collection(db, COLLECTIONS.TV_SHOWS);
      const docRef = await addDoc(tvShowsCollection, {
        ...tvShowData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding TV show:", error);
      throw error;
    }
  },

  async updateTVShow(tvShowId, tvShowData) {
    try {
      const tvShowDoc = doc(db, COLLECTIONS.TV_SHOWS, tvShowId);
      await updateDoc(tvShowDoc, {
        ...tvShowData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating TV show:", error);
      throw error;
    }
  },

  async deleteTVShow(tvShowId) {
    try {
      const tvShowDoc = doc(db, COLLECTIONS.TV_SHOWS, tvShowId);
      await deleteDoc(tvShowDoc);
    } catch (error) {
      console.error("Error deleting TV show:", error);
      throw error;
    }
  },
};

// User Services
export const userService = {
  async getAllUsers() {
    try {
      const usersCollection = collection(db, COLLECTIONS.USERS);
      const snapshot = await getDocs(usersCollection);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async addUser(userData) {
    try {
      const usersCollection = collection(db, COLLECTIONS.USERS);
      const docRef = await addDoc(usersCollection, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      const userDoc = doc(db, COLLECTIONS.USERS, userId);
      await updateDoc(userDoc, {
        ...userData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const userDoc = doc(db, COLLECTIONS.USERS, userId);
      await deleteDoc(userDoc);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

// Categories Services
export const categoryService = {
  async getAllCategories() {
    try {
      const categoriesCollection = collection(db, COLLECTIONS.CATEGORIES);
      const snapshot = await getDocs(categoriesCollection);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async addCategory(categoryData) {
    try {
      const categoriesCollection = collection(db, COLLECTIONS.CATEGORIES);
      const docRef = await addDoc(categoriesCollection, {
        ...categoryData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  },

  async updateCategory(categoryId, categoryData) {
    try {
      const categoryDoc = doc(db, COLLECTIONS.CATEGORIES, categoryId);
      await updateDoc(categoryDoc, {
        ...categoryData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  async deleteCategory(categoryId) {
    try {
      const categoryDoc = doc(db, COLLECTIONS.CATEGORIES, categoryId);
      await deleteDoc(categoryDoc);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};

// Tags Services
export const tagService = {
  async getAllTags() {
    try {
      const tagsCollection = collection(db, COLLECTIONS.TAGS);
      const snapshot = await getDocs(tagsCollection);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },

  async addTag(tagData) {
    try {
      const tagsCollection = collection(db, COLLECTIONS.TAGS);
      const docRef = await addDoc(tagsCollection, {
        ...tagData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding tag:", error);
      throw error;
    }
  },

  async updateTag(tagId, tagData) {
    try {
      const tagDoc = doc(db, COLLECTIONS.TAGS, tagId);
      await updateDoc(tagDoc, {
        ...tagData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating tag:", error);
      throw error;
    }
  },

  async deleteTag(tagId) {
    try {
      const tagDoc = doc(db, COLLECTIONS.TAGS, tagId);
      await deleteDoc(tagDoc);
    } catch (error) {
      console.error("Error deleting tag:", error);
      throw error;
    }
  },
};

// File Upload Services (Base64 instead of Firebase Storage)
export const uploadService = {
  // Convert file to base64
  async convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },

  // Upload image as base64
  async uploadImage(file, path) {
    try {
      const base64String = await this.convertToBase64(file);
      return base64String;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      throw error;
    }
  },

  // Video upload placeholder (skip for now)
  async uploadVideo(file, path) {
    throw new Error(
      "Video upload not implemented - files too large for base64"
    );
  },

  // Delete file placeholder (not needed for base64)
  async deleteFile(fileURL) {
    // No need to delete base64 strings, they're stored in the document
    return Promise.resolve();
  },
};

// Analytics Services
export const analyticsService = {
  async getStats() {
    try {
      // Get movies count
      const moviesSnapshot = await getDocs(collection(db, COLLECTIONS.MOVIES));
      const moviesCount = moviesSnapshot.size;

      // Get TV shows count
      const tvShowsSnapshot = await getDocs(
        collection(db, COLLECTIONS.TV_SHOWS)
      );
      const tvShowsCount = tvShowsSnapshot.size;

      // Get users count
      const usersSnapshot = await getDocs(collection(db, COLLECTIONS.USERS));
      const usersCount = usersSnapshot.size;

      return {
        moviesCount,
        tvShowsCount,
        usersCount,
        totalViews: 0, // This would need additional tracking
      };
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  },
};
