import { useState, useEffect } from "react";
import apiService from "../services/api";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const moviesData = await apiService.getAllMovies();
      setMovies(moviesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (movieData) => {
    try {
      const movie = await apiService.addMovie(movieData);
      await fetchMovies(); // Refresh the list
      return movie;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateMovie = async (movieId, movieData) => {
    try {
      await apiService.updateMovie(movieId, movieData);
      await fetchMovies(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await apiService.deleteMovie(movieId);
      await fetchMovies(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getMovieById = async (movieId) => {
    try {
      return await apiService.getMovieById(movieId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    addMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    refreshMovies: fetchMovies,
  };
};
