import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loading from "../../components/ui/Loading";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import logo from "../../assets/logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, loading, error, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Get the intended destination (or default to admin dashboard)
  const from = location.state?.from || "/admin";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear errors when user starts typing
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validation
    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(formData.email, formData.password, formData.rememberMe);

      // Navigation will be handled by the useEffect above
    } catch (error) {
      setFormError(error.message || "Failed to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            Admin Login
          </h2>
          <p className="text-gray-600">
            Sign in to access the Cup Entertainment admin panel
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Display */}
            {(formError || error) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{formError || error}</span>
              </div>
            )}

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
                  placeholder="Enter your password"
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
                  onClick={togglePasswordVisibility}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me (Optional) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    handleInputChange("rememberMe", e.target.checked)
                  }
                  className="h-4 w-4 text-[#af3494] focus:ring-[#af3494] border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-medium text-[#af3494] hover:text-[#9c2d84] transition-colors"
                  disabled={isSubmitting}
                >
                  Forgot password?
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
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Sign in to Admin Panel</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Protected by Cup Entertainment Security
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
            <Link to="#" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-gray-700 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default AdminLogin;
