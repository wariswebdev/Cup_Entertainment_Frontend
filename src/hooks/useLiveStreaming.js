import { useState, useEffect } from "react";
import { liveStreamService } from "../services/firebaseServices";

export const useLiveStreaming = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStreams = async () => {
    try {
      setLoading(true);
      const streamsData = await liveStreamService.getAllStreams();
      setStreams(streamsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addStream = async (streamData) => {
    try {
      const streamId = await liveStreamService.addStream(streamData);
      await fetchStreams(); // Refresh the list
      return streamId;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateStream = async (streamId, streamData) => {
    try {
      await liveStreamService.updateStream(streamId, streamData);
      await fetchStreams(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteStream = async (streamId) => {
    try {
      await liveStreamService.deleteStream(streamId);
      await fetchStreams(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const startStream = async (streamId) => {
    try {
      await liveStreamService.startStream(streamId);
      await fetchStreams(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const stopStream = async (streamId) => {
    try {
      await liveStreamService.stopStream(streamId);
      await fetchStreams(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getLiveStreams = () => {
    return streams.filter((stream) => stream.status === "live");
  };

  const getScheduledStreams = () => {
    return streams.filter((stream) => stream.status === "scheduled");
  };

  const getStreamsByTVShow = (tvShowId) => {
    return streams.filter((stream) => stream.tvShowId === tvShowId);
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  return {
    streams,
    loading,
    error,
    addStream,
    updateStream,
    deleteStream,
    startStream,
    stopStream,
    getLiveStreams,
    getScheduledStreams,
    getStreamsByTVShow,
    refreshStreams: fetchStreams,
  };
};
