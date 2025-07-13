import { useState, useEffect } from "react";
import { tvShowService } from "../services/firebaseServices";

export const useTVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTVShows = async () => {
    try {
      setLoading(true);
      const tvShowsData = await tvShowService.getAllTVShows();
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
      const tvShowId = await tvShowService.addTVShow(tvShowData);
      await fetchTVShows(); // Refresh the list
      return tvShowId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTVShow = async (tvShowId, tvShowData) => {
    try {
      await tvShowService.updateTVShow(tvShowId, tvShowData);
      await fetchTVShows(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTVShow = async (tvShowId) => {
    try {
      await tvShowService.deleteTVShow(tvShowId);
      await fetchTVShows(); // Refresh the list
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
    refreshTVShows: fetchTVShows,
  };
};
