// Testing utility for authentication endpoints
import apiService from "../services/api.js";

export const testBackendConnection = async () => {
  try {
    console.log("🔄 Testing backend connection...");

    // Test basic connection to backend
    const response = await fetch("http://localhost:3000");
    console.log("✅ Backend is reachable");

    return true;
  } catch (error) {
    console.error("❌ Backend connection failed:", error.message);
    return false;
  }
};

export const testSignup = async () => {
  try {
    console.log("🔄 Testing signup endpoint...");

    const testUser = {
      fullName: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "TestPassword123!",
    };

    const response = await apiService.signup(testUser);

    // Check for your backend's response format: { success, message, user, token }
    if (response.success && response.token && response.user) {
      console.log("✅ Signup successful:", {
        success: response.success,
        message: response.message,
        userId: response.user.id,
        userEmail: response.user.email,
        hasToken: !!response.token,
      });
      return { success: true, data: response };
    } else {
      console.log("⚠️ Signup response missing expected fields:", response);
      return { success: false, error: "Invalid response format" };
    }
  } catch (error) {
    console.error("❌ Signup test failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const testLogin = async (email, password) => {
  try {
    console.log("🔄 Testing login endpoint...");

    const response = await apiService.login({ email, password });

    // Check for your backend's response format: { success, message, user, token }
    if (response.success && response.token && response.user) {
      console.log("✅ Login successful:", {
        success: response.success,
        message: response.message,
        userId: response.user.id,
        userEmail: response.user.email,
        hasToken: !!response.token,
      });
      return { success: true, data: response };
    } else {
      console.log("⚠️ Login response missing expected fields:", response);
      return { success: false, error: "Invalid response format" };
    }
  } catch (error) {
    console.error("❌ Login test failed:", error.message);
    return { success: false, error: error.message };
  }
};

// Run all tests
export const runAuthTests = async () => {
  console.log("🚀 Starting authentication tests...\n");

  // Test 1: Backend connection
  const isConnected = await testBackendConnection();
  if (!isConnected) {
    console.log("❌ Cannot proceed with tests - backend not reachable\n");
    return;
  }

  console.log("");

  // Test 2: Signup
  const signupResult = await testSignup();
  if (!signupResult.success) {
    console.log("❌ Signup test failed, skipping login test\n");
    return;
  }

  console.log("");

  // Test 3: Login with the created user
  if (signupResult.data?.user?.email) {
    await testLogin(signupResult.data.user.email, "TestPassword123!");
  }

  console.log("\n✨ Authentication tests completed!");
};
