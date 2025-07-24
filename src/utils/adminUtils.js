import apiService from "../services/api";

export const initializeAdminUser = async () => {
  try {
    // Check if any admin user exists via backend
    const response = await apiService.request("/admin/check-exists");

    if (!response.exists) {
      console.log("No admin user found. Creating default admin...");

      // Default admin credentials
      const defaultAdmin = {
        fullName: "Cup Entertainment Admin",
        email: "admin@cupentertainment.com",
        password: "Admin123!",
        role: "admin",
      };

      // Create admin user via backend
      const adminResponse = await apiService.signup(defaultAdmin);

      console.log("Default admin user created successfully!");
      console.log("Email:", defaultAdmin.email);
      console.log("Password:", defaultAdmin.password);
      console.log("Please change these credentials after first login.");

      return adminResponse.user;
    } else {
      console.log("Admin user already exists.");
      return null;
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
    throw error;
  }
};

export const checkAdminExists = async () => {
  try {
    const response = await apiService.request("/admin/check-exists");
    return response.exists;
  } catch (error) {
    console.error("Error checking admin existence:", error);
    return false;
  }
};
