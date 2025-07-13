import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { useAuth } from "../../contexts/AuthContext";

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("One special character");
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
    setSuccess(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    // Validation
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const passwordErrors = validatePassword(formData.newPassword);
      if (passwordErrors.length > 0) {
        newErrors.newPassword = passwordErrors.join(", ");
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await changePassword(formData.newPassword);
      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrors({
        submit: error.message || "Failed to change password",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="flex items-center space-x-2">
          <Lock className="w-5 h-5" />
          <span>Change Password</span>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Password changed successfully!</span>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type={showPasswords.current ? "text" : "password"}
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="pl-10 pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("current")}
                disabled={isSubmitting}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type={showPasswords.new ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className="pl-10 pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("new")}
                disabled={isSubmitting}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
            )}

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="mt-2 text-xs space-y-1">
                <p className="text-gray-600">Password must contain:</p>
                <div className="grid grid-cols-2 gap-1">
                  <span
                    className={
                      formData.newPassword.length >= 8
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ 8+ characters
                  </span>
                  <span
                    className={
                      /[A-Z]/.test(formData.newPassword)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ Uppercase letter
                  </span>
                  <span
                    className={
                      /[a-z]/.test(formData.newPassword)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ Lowercase letter
                  </span>
                  <span
                    className={
                      /[0-9]/.test(formData.newPassword)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ Number
                  </span>
                  <span
                    className={
                      /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    ✓ Special character
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type={showPasswords.confirm ? "text" : "password"}
                placeholder="Confirm your new password"
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
                onClick={() => togglePasswordVisibility("confirm")}
                disabled={isSubmitting}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.currentPassword ||
                !formData.newPassword ||
                !formData.confirmPassword
              }
              className="min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
};

export default ChangePassword;
