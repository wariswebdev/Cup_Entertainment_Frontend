import { useState, useEffect } from "react";
import { movieService } from "../services/firebaseServices";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const moviesData = await movieService.getAllMovies();
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
      const movieId = await movieService.addMovie(movieData);
      await fetchMovies(); // Refresh the list
      return movieId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateMovie = async (movieId, movieData) => {
    try {
      await movieService.updateMovie(movieId, movieData);
      await fetchMovies(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await movieService.deleteMovie(movieId);
      await fetchMovies(); // Refresh the list
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
    refreshMovies: fetchMovies,
  };
};
