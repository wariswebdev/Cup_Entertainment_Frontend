import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

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

  // Check if user is admin
  const isAdmin = () => {
    return !!userProfile; // If user has a profile in admin collection, they are admin
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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch admin profile from Firestore
      const adminDoc = await getDoc(doc(db, "admin", user.uid));

      if (adminDoc.exists()) {
        const profile = adminDoc.data();

        // Check if account is active
        if (profile.status === "suspended" || profile.status === "inactive") {
          await signOut(auth);
          throw new Error("Account is suspended. Contact administrator.");
        }

        // Update login tracking
        const loginData = {
          lastLogin: new Date().toISOString(),
          loginCount: (profile.loginCount || 0) + 1,
          lastIP: "Unknown", // You can implement IP tracking if needed
          rememberMe: rememberMe,
        };

        await updateDoc(doc(db, "admin", user.uid), loginData);

        setUserProfile({ ...profile, ...loginData });
        setLastActivity(Date.now());

        return { user, profile: { ...profile, ...loginData } };
      } else {
        await signOut(auth);
        throw new Error(
          "Admin profile not found. Please contact administrator."
        );
      }
    } catch (error) {
      console.error("Sign in error:", error);
      let errorMessage = "Failed to sign in. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        default:
          errorMessage = error.message;
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
      // Update logout time if user exists
      if (user && userProfile) {
        await updateDoc(doc(db, "admin", user.uid), {
          lastLogout: new Date().toISOString(),
        });
      }

      await signOut(auth);
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
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      let errorMessage = "Failed to send password reset email.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Change password
  const changePassword = async (newPassword) => {
    try {
      setError(null);
      if (!user) throw new Error("No user signed in");

      await updatePassword(user, newPassword);

      // Update password change timestamp
      await updateDoc(doc(db, "admin", user.uid), {
        passwordChangedAt: new Date().toISOString(),
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create admin profile in Firestore
      const adminProfile = {
        uid: user.uid,
        email: user.email,
        name: userData.name || "Admin",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: "active",
        ...userData,
      };

      await setDoc(doc(db, "admin", user.uid), adminProfile);
      setUserProfile(adminProfile);

      return { user, profile: adminProfile };
    } catch (error) {
      console.error("Create admin error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Update last login
  const updateLastLogin = async () => {
    if (user && userProfile) {
      try {
        await setDoc(
          doc(db, "admin", user.uid),
          {
            ...userProfile,
            lastLogin: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Update last login error:", error);
      }
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);

          // Fetch admin profile
          const adminDoc = await getDoc(doc(db, "admin", firebaseUser.uid));

          if (adminDoc.exists()) {
            const profile = adminDoc.data();

            // Check if account is active
            if (
              profile.status !== "suspended" &&
              profile.status !== "inactive"
            ) {
              setUserProfile(profile);
              setLastActivity(Date.now());
              updateLastLogin();
            } else {
              // Account suspended, sign out
              await signOut(auth);
              setUser(null);
              setUserProfile(null);
              setError("Account suspended. Contact administrator.");
            }
          } else {
            // No admin profile found, sign out
            await signOut(auth);
            setUser(null);
            setUserProfile(null);
            setError("Admin profile not found.");
          }
        } else {
          setUser(null);
          setUserProfile(null);
          setLastActivity(Date.now());
          setShowSessionWarning(false);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setError(error.message);
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
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
    isAdmin,
    isAuthenticated: !!user && !!userProfile && isAdmin(),
    lastActivity,
    showSessionWarning,
    extendSession,
    sessionTimeout: SESSION_TIMEOUT,
    updateActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
