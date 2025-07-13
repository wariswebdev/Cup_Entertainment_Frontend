import React, { useState, useEffect } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const SessionWarning = ({ isOpen, onExtend, onLogout, timeRemaining }) => {
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (!isOpen) {
      setCountdown(300);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onLogout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // Prevent closing by clicking outside
      title="Session Expiring"
      size="sm"
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your session is about to expire
          </h3>
          <p className="text-gray-600 mb-4">
            For your security, you'll be automatically logged out in:
          </p>

          <div className="flex items-center justify-center space-x-2 text-2xl font-mono font-bold text-red-600">
            <Clock className="w-6 h-6" />
            <span>{formatTime(countdown)}</span>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button variant="outline" onClick={onLogout} className="flex-1">
            Logout Now
          </Button>
          <Button onClick={onExtend} className="flex-1">
            Stay Logged In
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SessionWarning;
