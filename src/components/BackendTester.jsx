import React, { useState } from "react";
import { runAuthTests, testBackendConnection } from "../utils/testAuth";
import Button from "./ui/Button";

const BackendTester = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isTestingAuth, setIsTestingAuth] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    const isConnected = await testBackendConnection();
    setConnectionStatus(isConnected);
    setIsTestingConnection(false);
  };

  const handleTestAuth = async () => {
    setIsTestingAuth(true);
    await runAuthTests();
    setIsTestingAuth(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Backend Integration Tests</h3>

      <div className="space-y-3">
        {/* Connection Test */}
        <div>
          <Button
            onClick={handleTestConnection}
            disabled={isTestingConnection}
            variant="outline"
            size="sm"
            className="w-full"
          >
            {isTestingConnection ? "Testing..." : "Test Backend Connection"}
          </Button>
          {connectionStatus !== null && (
            <div
              className={`text-sm mt-1 ${
                connectionStatus ? "text-green-600" : "text-red-600"
              }`}
            >
              {connectionStatus
                ? "✅ Backend Connected"
                : "❌ Backend Not Reachable"}
            </div>
          )}
        </div>

        {/* Auth Tests */}
        <div>
          <Button
            onClick={handleTestAuth}
            disabled={isTestingAuth}
            size="sm"
            className="w-full"
          >
            {isTestingAuth ? "Testing..." : "Test Auth Endpoints"}
          </Button>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Check browser console for detailed test results
        </div>
      </div>
    </div>
  );
};

export default BackendTester;
