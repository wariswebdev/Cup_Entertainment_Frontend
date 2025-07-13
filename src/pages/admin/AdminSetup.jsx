import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loading from "../../components/ui/Loading";
import logo from "../../assets/logo.png";

const AdminSetup = () => {
  const navigate = useNavigate();
  const { createAdminUser } = useAuth();

  const [step, setStep] = useState(1); // 1: Check, 2: Setup, 3: Complete
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Check if admin already exists
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const adminCollection = collection(db, "admin");
        const snapshot = await getDocs(adminCollection);

        if (!snapshot.empty) {
          // Admin exists, redirect to login
          navigate("/admin/login", { replace: true });
        } else {
          // No admin exists, show setup
          setStep(2);
        }
      } catch (error) {
        console.error("Error checking admin:", error);
        setError("Failed to check admin status");
      } finally {
        setLoading(false);
      }
    };

    checkAdminExists();
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError("");

      await createAdminUser(formData.email, formData.password, {
        name: formData.name,
        role: "admin",
        isAdmin: true,
      });

      setStep(3);

      // Auto redirect after 3 seconds
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 3000);
    } catch (error) {
      setError(error.message || "Failed to create admin account");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Checking admin status..." />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-green-500 rounded-full">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Setup Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Your admin account has been created successfully. You will be
              redirected to the admin panel shortly.
            </p>
            <Button
              onClick={() => navigate("/admin", { replace: true })}
              className="w-full"
            >
              Go to Admin Panel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Cup Entertainment" className="h-16 w-auto" />
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-[#af3494] rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Admin Setup
          </h2>
          <p className="text-gray-600">
            Create your admin account to get started with Cup Entertainment
          </p>
        </div>

        {/* Setup Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@cupentertainment.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-10 pr-10"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters long
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="pl-10 pr-10"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full flex justify-center items-center space-x-2 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Admin Account...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Create Admin Account</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            This will create the main administrator account for Cup
            Entertainment
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
