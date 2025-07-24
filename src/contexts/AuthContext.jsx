import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import apiService from "../services/api";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  // Session management
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

  // Activity tracking
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!localStorage.getItem("authToken");

  // Check if user is admin (you can modify this logic based on your backend response)
  const isAdmin = () => {
    return user?.role === "admin" || false;
  };

  // Update activity timestamp
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowSessionWarning(false);
  }, []);

  // Session timeout handler
  const handleSessionTimeout = useCallback(async () => {
    setShowSessionWarning(false);
    await logout();
    setError("Session expired. Please sign in again.");
  }, []);

  // Check session validity
  const checkSession = useCallback(() => {
    if (!user) return;

    const now = Date.now();
    const timeSinceActivity = now - lastActivity;

    if (timeSinceActivity >= SESSION_TIMEOUT) {
      handleSessionTimeout();
    } else if (
      timeSinceActivity >= SESSION_TIMEOUT - WARNING_TIME &&
      !showSessionWarning
    ) {
      setShowSessionWarning(true);
    }
  }, [user, lastActivity, showSessionWarning, handleSessionTimeout]);

  // Activity event listeners
  useEffect(() => {
    if (!user) return;

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    const activityHandler = () => updateActivity();

    events.forEach((event) => {
      document.addEventListener(event, activityHandler, true);
    });

    // Set up session check interval
    const sessionInterval = setInterval(checkSession, 60000); // Check every minute

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, activityHandler, true);
      });
      clearInterval(sessionInterval);
    };
  }, [user, updateActivity, checkSession]);

  // Extend session
  const extendSession = useCallback(() => {
    updateActivity();
    setShowSessionWarning(false);
  }, [updateActivity]);

  // Sign in with email and password
  const signIn = async (email, password, rememberMe = false) => {
    try {
      setError(null);
      setLoading(true);

      const response = await apiService.login({ email, password });

      if (response.token && response.user) {
        // Store the token in localStorage
        localStorage.setItem("authToken", response.token);

        // Set user data
        setUser(response.user);
        setUserProfile(response.user);
        setLastActivity(Date.now());

        // Store user data in localStorage if rememberMe is checked
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(response.user));
        }

        return { user: response.user, profile: response.user };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      let errorMessage = "Failed to sign in. Please try again.";

      // Handle different error types
      if (
        error.message.includes("Invalid credentials") ||
        error.message.includes("User not found") ||
        error.message.includes("Incorrect password")
      ) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes("Email not verified")) {
        errorMessage = "Please verify your email address before signing in.";
      } else if (
        error.message.includes("Account suspended") ||
        error.message.includes("Account disabled")
      ) {
        errorMessage =
          "Your account has been suspended. Please contact support.";
      } else if (error.message.includes("Too many requests")) {
        errorMessage = "Too many login attempts. Please try again later.";
      } else {
        errorMessage = error.message || errorMessage;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      // Call backend logout endpoint (if available)
      try {
        await apiService.logout();
      } catch (error) {
        // Continue with local logout even if backend call fails
        console.warn("Backend logout failed:", error);
      }

      // Clear local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      // Reset state
      setUser(null);
      setUserProfile(null);
      setLastActivity(Date.now());
      setShowSessionWarning(false);
      setError(null);
    } catch (error) {
      console.error("Sign out error:", error);
      setError(error.message);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null);
      await apiService.forgotPassword(email);
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      let errorMessage = "Failed to send password reset email.";

      if (
        error.message.includes("User not found") ||
        error.message.includes("No account found")
      ) {
        errorMessage = "No account found with this email address.";
      } else if (error.message.includes("Invalid email")) {
        errorMessage = "Invalid email address format.";
      } else {
        errorMessage = error.message || errorMessage;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setError(null);
      if (!user) throw new Error("No user signed in");

      await apiService.changePassword({
        currentPassword,
        newPassword,
      });

      return true;
    } catch (error) {
      console.error("Change password error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Create admin user (for setup purposes)
  const createAdminUser = async (email, password, userData) => {
    try {
      setError(null);
      const response = await apiService.signup({
        fullName: userData.name || userData.fullName,
        email,
        password,
        role: "admin",
        ...userData,
      });

      if (response.token && response.user) {
        localStorage.setItem("authToken", response.token);
        setUser(response.user);
        setUserProfile(response.user);
        return { user: response.user, profile: response.user };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Create admin error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Create regular user
  const createUser = async (email, password, userData) => {
    try {
      setError(null);
      const response = await apiService.signup({
        fullName: userData.name || userData.fullName,
        email,
        password,
        role: "user",
        ...userData,
      });

      if (response.token && response.user) {
        localStorage.setItem("authToken", response.token);
        setUser(response.user);
        setUserProfile(response.user);
        return { user: response.user, profile: response.user };
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Create user error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Check for existing authentication on app load
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          // Verify token with backend
          try {
            const response = await apiService.getProfile();
            setUser(response.user || JSON.parse(userData));
            setUserProfile(response.user || JSON.parse(userData));
            setLastActivity(Date.now());
          } catch (error) {
            // Token is invalid, clear it
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            setUser(null);
            setUserProfile(null);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    checkExistingAuth();
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    error,
    signIn,
    logout,
    resetPassword,
    changePassword,
    createAdminUser,
    createUser,
    isAdmin,
    isAuthenticated,
    lastActivity,
    showSessionWarning,
    extendSession,
    sessionTimeout: SESSION_TIMEOUT,
    updateActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
