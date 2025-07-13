import React, { useState, useEffect } from "react";
import { Shield, User, AlertCircle, CheckCircle } from "lucide-react";
import Button from "../ui/Button";
import { initializeAdminUser, checkAdminExists } from "../../utils/adminUtils";

const AdminInitializer = () => {
  const [adminExists, setAdminExists] = useState(null);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const exists = await checkAdminExists();
        setAdminExists(exists);
      } catch (error) {
        console.error("Error checking admin:", error);
        setError("Failed to check admin status");
      }
    };

    checkAdmin();
  }, []);

  const handleInitializeAdmin = async () => {
    try {
      setInitializing(true);
      setError("");
      setSuccess("");

      const result = await initializeAdminUser();

      if (result) {
        setSuccess(
          "Default admin user created successfully! Check console for credentials."
        );
        setAdminExists(true);
      } else {
        setError("Admin user already exists");
      }
    } catch (error) {
      setError("Failed to create admin user: " + error.message);
    } finally {
      setInitializing(false);
    }
  };

  if (adminExists === null) {
    return null; // Loading
  }

  if (adminExists) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-sm font-semibold text-green-800">
            Admin User Ready
          </h3>
        </div>
        <p className="text-green-700 text-sm mt-1">
          An admin user already exists. You can log in to the admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-semibold text-blue-800">
          Admin Setup Required
        </h3>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded mb-3 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-3 py-2 rounded mb-3 flex items-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      <p className="text-blue-700 text-sm mb-4">
        No admin user found. Click the button below to create a default admin
        account for development.
      </p>

      <div className="space-y-2">
        <Button
          onClick={handleInitializeAdmin}
          disabled={initializing}
          className="bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          {initializing ? "Creating Admin..." : "Create Default Admin"}
        </Button>

        <div className="text-xs text-blue-600 space-y-1">
          <p>
            <strong>Default credentials:</strong>
          </p>
          <p>Email: admin@cupentertainment.com</p>
          <p>Password: Admin123!</p>
          <p className="text-blue-500">⚠️ Change these after first login</p>
        </div>
      </div>
    </div>
  );
};

export default AdminInitializer;
