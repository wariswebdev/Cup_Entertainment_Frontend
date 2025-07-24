import { useState, useEffect } from "react";
import apiService from "../services/api";

export const useTVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTVShows = async () => {
    try {
      setLoading(true);
      const tvShowsData = await apiService.getAllTVShows();
      setTVShows(tvShowsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTVShow = async (tvShowData) => {
    try {
      const tvShow = await apiService.addTVShow(tvShowData);
      await fetchTVShows(); // Refresh the list
      return tvShow;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTVShow = async (tvShowId, tvShowData) => {
    try {
      await apiService.updateTVShow(tvShowId, tvShowData);
      await fetchTVShows(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTVShow = async (tvShowId) => {
    try {
      await apiService.deleteTVShow(tvShowId);
      await fetchTVShows(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getTVShowById = async (tvShowId) => {
    try {
      return await apiService.getTVShowById(tvShowId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTVShows();
  }, []);

  return {
    tvShows,
    loading,
    error,
    addTVShow,
    updateTVShow,
    deleteTVShow,
    getTVShowById,
    refreshTVShows: fetchTVShows,
  };
};
