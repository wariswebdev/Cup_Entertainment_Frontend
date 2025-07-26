import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import logoDark from "../assets/logo-dark.png";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, sendOTP, verifyOTP, loading, error, isAuthenticated } =
    useAuth();

  const [currentStep, setCurrentStep] = useState(1); // 1: Form, 2: OTP, 3: Complete
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [otpData, setOtpData] = useState({
    otp: "",
    otpSent: false,
    resendCooldown: 0,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Password validation
  useEffect(() => {
    const password = formData.password;
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  // Resend OTP cooldown timer
  useEffect(() => {
    let interval;
    if (otpData.resendCooldown > 0) {
      interval = setInterval(() => {
        setOtpData((prev) => ({
          ...prev,
          resendCooldown: prev.resendCooldown - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpData.resendCooldown]);

  const handleInputChange = (field, value) => {
    if (field === "otp") {
      // Only allow numbers and limit to 6 digits
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 6);
      setOtpData((prev) => ({
        ...prev,
        otp: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear specific field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!Object.values(passwordRequirements).every((req) => req)) {
      errors.password = "Password does not meet all requirements";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      // Step 1: Validate form and send OTP
      if (!validateForm()) {
        return;
      }

      try {
        setIsSubmitting(true);
        await sendOTP(formData.email, "signup");
        setOtpData((prev) => ({
          ...prev,
          otpSent: true,
          resendCooldown: 60,
        }));
        setCurrentStep(2);
        setFormErrors({});
      } catch (error) {
        setFormErrors({ submit: error.message });
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep === 2) {
      // Step 2: Verify OTP and complete signup
      if (!otpData.otp || otpData.otp.length !== 6) {
        setFormErrors({ otp: "Please enter a valid 6-digit OTP" });
        return;
      }

      try {
        setIsSubmitting(true);

        // Verify OTP first
        await verifyOTP(formData.email, otpData.otp, "signup");

        // Then complete the signup
        await createUser(
          formData.email,
          formData.password,
          {
            fullName: formData.name,
            name: formData.name,
            role: "user",
          },
          otpData.otp
        );

        setCurrentStep(3);
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      } catch (error) {
        setFormErrors({ otp: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResendOTP = async () => {
    if (otpData.resendCooldown > 0) return;

    try {
      setIsSubmitting(true);
      await sendOTP(formData.email, "signup");
      setOtpData((prev) => ({
        ...prev,
        resendCooldown: 60,
      }));
      setFormErrors({});
    } catch (error) {
      setFormErrors({ otp: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentStep(1);
    setOtpData({
      otp: "",
      otpSent: false,
      resendCooldown: 0,
    });
    setFormErrors({});
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (loading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#af3494]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12">
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

      {/* Sign Up Form */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-gray-800/50 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src={logoDark}
              alt="Cup Entertainment"
              className="h-12 w-auto mx-auto mb-4"
            />
            {currentStep === 1 && (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Join Cup Entertainment
                </h1>
                <p className="text-gray-400">
                  Create your account and start watching
                </p>
              </>
            )}
            {currentStep === 2 && (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Verify Your Email
                </h1>
                <p className="text-gray-400">
                  We've sent a verification code to your email
                </p>
              </>
            )}
            {currentStep === 3 && (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Welcome to Cup Entertainment!
                </h1>
                <p className="text-gray-400">
                  Your account has been created successfully
                </p>
              </>
            )}
          </div>

          {/* Error Message */}
          {(formErrors.submit || error) && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {formErrors.submit || error}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#af3494] focus:ring-[#af3494]/20"
                      required
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>

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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#af3494] focus:ring-[#af3494]/20"
                      required
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.email}
                    </p>
                  )}
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
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#af3494] focus:ring-[#af3494]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-400 mb-2">
                        Password must contain:
                      </p>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div
                          className={`flex items-center space-x-2 ${
                            passwordRequirements.length
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              passwordRequirements.length
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                          />
                          <span>At least 8 characters</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${
                            passwordRequirements.uppercase
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              passwordRequirements.uppercase
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                          />
                          <span>One uppercase letter</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${
                            passwordRequirements.lowercase
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              passwordRequirements.lowercase
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                          />
                          <span>One lowercase letter</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${
                            passwordRequirements.number
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              passwordRequirements.number
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                          />
                          <span>One number</span>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${
                            passwordRequirements.special
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              passwordRequirements.special
                                ? "opacity-100"
                                : "opacity-30"
                            }`}
                          />
                          <span>One special character</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10 pr-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#af3494] focus:ring-[#af3494]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        handleInputChange("agreeToTerms", e.target.checked)
                      }
                      className="mt-1 rounded border-gray-700 bg-gray-900/50 text-[#af3494] focus:ring-[#af3494] focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-300 leading-relaxed">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-[#af3494] hover:text-[#9c2d84] transition-colors"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-[#af3494] hover:text-[#9c2d84] transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {formErrors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.agreeToTerms}
                    </p>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Step Progress */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-[#af3494] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      ✓
                    </div>
                    <div className="w-12 h-0.5 bg-[#af3494]"></div>
                    <div className="w-8 h-8 bg-[#af3494] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Verify Your Email
                  </h3>
                  <p className="text-gray-400 text-sm">
                    We've sent a 6-digit verification code to{" "}
                    <span className="text-[#af3494] font-medium">
                      {formData.email}
                    </span>
                  </p>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Verification Code
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otpData.otp}
                      onChange={(e) => handleInputChange("otp", e.target.value)}
                      className="text-center text-2xl tracking-widest bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-[#af3494] focus:ring-[#af3494]/20"
                      maxLength={6}
                      required
                    />
                  </div>
                  {formErrors.otp && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.otp}
                    </p>
                  )}
                </div>

                {/* Resend OTP */}
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">
                    Didn't receive the code?
                  </p>
                  {otpData.resendCooldown > 0 ? (
                    <p className="text-sm text-gray-400">
                      Resend in {otpData.resendCooldown} seconds
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={isSubmitting}
                      className="text-sm text-[#af3494] hover:text-[#9c2d84] transition-colors disabled:opacity-50"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                {/* Back Button */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleBackToForm}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back to form
                  </button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Account Created Successfully!
                </h3>
                <p className="text-gray-400 mb-4">
                  Welcome to Cup Entertainment. Redirecting to your dashboard...
                </p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#af3494] mx-auto"></div>
              </div>
            )}

            {/* Submit Button */}
            {currentStep < 3 && (
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  (currentStep === 1 &&
                    !Object.values(passwordRequirements).every((req) => req)) ||
                  (currentStep === 2 &&
                    (!otpData.otp || otpData.otp.length !== 6))
                }
                className="w-full bg-[#af3494] hover:bg-[#9c2d84] text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {currentStep === 1 ? "Sending Code..." : "Verifying..."}
                  </div>
                ) : currentStep === 1 ? (
                  "Send Verification Code"
                ) : (
                  "Verify & Create Account"
                )}
              </Button>
            )}
          </form>

          {/* Sign In Link */}
          {currentStep < 3 && (
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#af3494] hover:text-[#9c2d84] font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {/* Benefits Section */}
          {currentStep === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/60 text-gray-400">
                    Join thousands of entertainment lovers
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
