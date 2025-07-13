import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

// Run this function to create your admin account with the correct structure
export const createAdminAccountManually = async () => {
  try {
    const email = "rizwanpervaizwork@gmail.com";
    const password = "rizwan-admin";
    const name = "Rizwan Pervaiz";

    console.log("Creating admin account...");

    // Create the Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("Firebase Auth user created with UID:", user.uid);

    // Create the admin profile in the correct location: /admin/{user.uid}
    const adminProfile = {
      uid: user.uid,
      email: user.email,
      name: name,
      role: "admin",
      isAdmin: true,
      status: "active",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      loginCount: 0,
    };

    // Store under the user's UID (this is the key part!)
    await setDoc(doc(db, "admin", user.uid), adminProfile);

    console.log("Admin profile created successfully!");
    console.log("Document path: /admin/" + user.uid);
    console.log("You can now sign in with:");
    console.log("Email:", email);
    console.log("Password:", password);

    return { success: true, user, profile: adminProfile };
  } catch (error) {
    console.error("Error creating admin account:", error);
    return { success: false, error: error.message };
  }
};

// Uncomment and run this in your browser console if needed
// createAdminAccountManually();
