import React from "react";
import { Radio, Users, Calendar } from "lucide-react";

const LiveStreamIndicator = ({ 
  streams = [], 
  tvShowId = null, 
  compact = false 
}) => {
  const relevantStreams = tvShowId 
    ? streams.filter(stream => stream.tvShowId === tvShowId)
    : streams;

  const liveStreams = relevantStreams.filter(stream => stream.status === 'live');
  const scheduledStreams = relevantStreams.filter(stream => stream.status === 'scheduled');

  if (relevantStreams.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        {liveStreams.length > 0 && (
          <div className="flex items-center space-x-1 text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">LIVE</span>
          </div>
        )}
        {scheduledStreams.length > 0 && (
          <div className="flex items-center space-x-1 text-blue-600">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{scheduledStreams.length}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {liveStreams.map((stream) => (
        <div
          key={stream.id}
          className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-900 truncate">
              {stream.title}
            </p>
            <div className="flex items-center space-x-2 text-xs text-red-700">
              <Users className="w-3 h-3" />
              <span>{stream.viewers || 0} viewers</span>
              <span>•</span>
              <span>{stream.category}</span>
            </div>
          </div>
        </div>
      ))}

      {scheduledStreams.slice(0, 2).map((stream) => (
        <div
          key={stream.id}
          className="flex items-center space-x-2 p-2 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <Calendar className="w-4 h-4 text-blue-600" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-blue-900 truncate">
              {stream.title}
            </p>
            <p className="text-xs text-blue-700">
              {new Date(stream.startTime).toLocaleDateString()} at{' '}
              {new Date(stream.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      ))}

      {scheduledStreams.length > 2 && (
        <div className="text-xs text-gray-500 text-center">
          +{scheduledStreams.length - 2} more scheduled
        </div>
      )}
    </div>
  );
};

export default LiveStreamIndicator;
