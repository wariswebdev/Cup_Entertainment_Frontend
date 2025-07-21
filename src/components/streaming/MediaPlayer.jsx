import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  RotateCcw,
  RotateCw,
  ArrowLeft,
} from "lucide-react";

const MediaPlayer = ({
  src,
  isFullscreen,
  onFullscreen,
  title,
  description,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressRef = useRef(null);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Progressive loading state
  const [buffered, setBuffered] = useState(0);

  // Video dimensions state
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Format time helper
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPlaying]);

  // Skip forward/backward
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
    }
  };

  // Volume controls
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Playback rate controls
  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSettings(false);
  };

  // Progress bar handling
  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Controls visibility
  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Video event handlers
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      // Update video dimensions for overlay sizing
      const video = videoRef.current;
      const container = containerRef.current;
      if (container) {
        const containerAspect = container.clientWidth / container.clientHeight;
        const videoAspect = video.videoWidth / video.videoHeight;

        let displayWidth, displayHeight;
        if (videoAspect > containerAspect) {
          // Video is wider than container
          displayWidth = container.clientWidth;
          displayHeight = container.clientWidth / videoAspect;
        } else {
          // Video is taller than container
          displayHeight = container.clientHeight;
          displayWidth = container.clientHeight * videoAspect;
        }

        setVideoDimensions({ width: displayWidth, height: displayHeight });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);

      // Update buffered progress
      if (videoRef.current.buffered.length > 0) {
        const bufferedEnd = videoRef.current.buffered.end(
          videoRef.current.buffered.length - 1
        );
        setBuffered((bufferedEnd / duration) * 100);
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsBuffering(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handleCanPlay = () => {
    setIsBuffering(false);
  };

  // Keyboard controls
  const handleKeyDown = useCallback(
    (e) => {
      if (!videoRef.current) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipBackward();
          break;
        case "ArrowRight":
          e.preventDefault();
          skipForward();
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(volume + 0.1, 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(volume - 0.1, 0));
          break;
        case "KeyF":
          e.preventDefault();
          onFullscreen();
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
      showControlsTemporarily();
    },
    [togglePlayPause, volume, onFullscreen]
  );

  // Mouse movement handler
  const handleMouseMove = () => {
    showControlsTemporarily();
  };

  // Handle window resize to update video dimensions
  const handleResize = useCallback(() => {
    if (videoRef.current && containerRef.current) {
      const video = videoRef.current;
      const container = containerRef.current;
      const containerAspect = container.clientWidth / container.clientHeight;
      const videoAspect = video.videoWidth / video.videoHeight;

      let displayWidth, displayHeight;
      if (videoAspect > containerAspect) {
        displayWidth = container.clientWidth;
        displayHeight = container.clientWidth / videoAspect;
      } else {
        displayHeight = container.clientHeight;
        displayWidth = container.clientHeight * videoAspect;
      }

      setVideoDimensions({ width: displayWidth, height: displayHeight });
    }
  }, []);

  // Effects
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleKeyDown, handleResize]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative ${
        isFullscreen
          ? "w-screen h-screen bg-black"
          : "w-full h-screen bg-transparent"
      } overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onClick={togglePlayPause}
      />

      {/* Loading Spinner */}
      <AnimatePresence>
        {isBuffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-black/80 via-transparent to-black/50"
            style={{
              width: videoDimensions.width || "100%",
              height: videoDimensions.height || "100%",
            }}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {!isFullscreen && (
                  <button
                    onClick={() => window.history.back()}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-white text-xl font-semibold">{title}</h1>
                  {description && (
                    <p className="text-gray-300 text-sm">{description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/20"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-16 right-6 bg-black/90 rounded-lg p-4 min-w-48"
                >
                  <h3 className="text-white font-semibold mb-3">
                    Playback Speed
                  </h3>
                  <div className="space-y-2">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          playbackRate === rate
                            ? "bg-[#af3494] text-white"
                            : "text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Play Button */}
            {!isPlaying && !isBuffering && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors">
                  <Play className="w-16 h-16 text-white ml-2" />
                </div>
              </motion.button>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Progress Bar */}
              <div className="mb-4">
                <div
                  ref={progressRef}
                  className="relative h-2 bg-white/20 rounded-full cursor-pointer group"
                  onClick={handleProgressClick}
                >
                  {/* Buffered Progress */}
                  <div
                    className="absolute h-full bg-white/40 rounded-full"
                    style={{ width: `${buffered}%` }}
                  />
                  {/* Current Progress */}
                  <div
                    className="absolute h-full bg-[#af3494] rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                  {/* Progress Handle */}
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#af3494] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progressPercentage}% - 8px)` }}
                  />
                </div>
                <div className="flex justify-between text-white text-sm mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Skip Backward */}
                  <button
                    onClick={skipBackward}
                    className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/20"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </button>

                  {/* Skip Forward */}
                  <button
                    onClick={skipForward}
                    className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/20"
                  >
                    <RotateCw className="w-6 h-6" />
                  </button>

                  {/* Volume Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/20"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Playback Speed Indicator */}
                  {playbackRate !== 1 && (
                    <span className="text-white text-sm bg-white/20 px-2 py-1 rounded">
                      {playbackRate}x
                    </span>
                  )}

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={onFullscreen}
                    className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/20"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom styles for volume slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #af3494;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #af3494;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default MediaPlayer;
