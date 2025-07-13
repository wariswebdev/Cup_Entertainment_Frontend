import { useState, useEffect } from "react";
import { analyticsService } from "../services/firebaseServices";

export const useAnalytics = () => {
  const [stats, setStats] = useState({
    moviesCount: 0,
    tvShowsCount: 0,
    usersCount: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const statsData = await analyticsService.getStats();
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats,
  };
};
