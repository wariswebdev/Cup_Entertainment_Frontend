import apiService from "../services/api";

// Run this function to create your admin account with the correct structure
export const createAdminAccountManually = async () => {
  try {
    const email = "rizwanpervaizwork@gmail.com";
    const password = "rizwan-admin";
    const fullName = "Rizwan Pervaiz";

    console.log("Creating admin account...");

    // Create the admin user via backend API
    const response = await apiService.signup({
      fullName,
      email,
      password,
      role: "admin",
    });

    console.log("Admin account created successfully!");
    console.log("User ID:", response.user.id);
    console.log("You can now sign in with:");
    console.log("Email:", email);
    console.log("Password:", password);

    return { success: true, user: response.user };
  } catch (error) {
    console.error("Error creating admin account:", error);
    return { success: false, error: error.message };
  }
};

// Uncomment and run this in your browser console if needed
// createAdminAccountManually();
