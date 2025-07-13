import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={success ? "Reset Email Sent" : "Reset Password"}
      size="sm"
    >
      {success ? (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Password reset email sent!
            </h3>
            <p className="text-gray-600 mb-4">
              We've sent a password reset link to <strong>{email}</strong>.
              Please check your email and follow the instructions to reset your
              password.
            </p>
            <p className="text-sm text-gray-500">
              If you don't see the email, please check your spam folder.
            </p>
          </div>

          <Button onClick={handleClose} className="w-full">
            Back to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="reset-email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="reset-email"
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reset Link
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
