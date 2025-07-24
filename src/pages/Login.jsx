import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal";
import logoDark from "../assets/logo-dark.png";

const Login = () => {
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

  // Get the intended destination (or default to dashboard)
  const from = location.state?.from || "/dashboard";

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
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(formData.email, formData.password, formData.rememberMe);
      navigate(from, { replace: true });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#af3494]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background with movie posters */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-1">
        {Array.from({ length: 40 }, (_, index) => (
          <div key={index} className="aspect-[2/3] overflow-hidden">
            <img
              src={`/poster/Image (${(index % 28) + 1}).png`}
              alt={`Movie poster ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-[#141414]/90"></div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-white hover:text-[#af3494] transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-gray-800/50 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src={logoDark}
              alt="Cup Entertainment"
              className="h-12 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {(formError || error) && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {formError || error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#af3494] focus:ring-[#af3494]/20"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#af3494] focus:ring-[#af3494]/20"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    handleInputChange("rememberMe", e.target.checked)
                  }
                  className="rounded border-gray-700 bg-gray-900/50 text-[#af3494] focus:ring-[#af3494] focus:ring-offset-0"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-[#af3494] hover:text-[#9c2d84] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#af3494] hover:bg-[#9c2d84] text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#af3494] hover:text-[#9c2d84] font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Social Login Options (Optional) */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/60 text-gray-400">
                  Start your entertainment journey
                </span>
              </div>
            </div>
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

export default Login;
