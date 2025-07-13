import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../config/firebase";

export const initializeAdminUser = async () => {
  try {
    // Check if any admin user exists
    const adminCollection = collection(db, "admin");
    const snapshot = await getDocs(adminCollection);

    if (snapshot.empty) {
      console.log("No admin user found. Creating default admin...");

      // Default admin credentials
      const defaultAdmin = {
        email: "admin@cupentertainment.com",
        password: "Admin123!",
        name: "Cup Entertainment Admin",
        role: "admin",
        isAdmin: true,
      };

      // Create admin user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        defaultAdmin.email,
        defaultAdmin.password
      );

      const user = userCredential.user;

      // Create user profile in Firestore
      const adminProfile = {
        uid: user.uid,
        email: user.email,
        name: defaultAdmin.name,
        role: "admin",
        isAdmin: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: "Active",
      };

      await setDoc(doc(db, "admin", user.uid), adminProfile);

      console.log("Default admin user created successfully!");
      console.log("Email:", defaultAdmin.email);
      console.log("Password:", defaultAdmin.password);
      console.log("Please change these credentials after first login.");

      return adminProfile;
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
    const adminCollection = collection(db, "admin");
    const snapshot = await getDocs(adminCollection);
    return !snapshot.empty;
  } catch (error) {
    console.error("Error checking admin existence:", error);
    return false;
  }
};
