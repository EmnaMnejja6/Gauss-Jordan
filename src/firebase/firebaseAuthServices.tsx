import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
// Sign Up
export const signUp = async (
  email: string,
  password: string,
  displayName: any
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  } catch (error: any) {
    throw error.message;
  }
};

// Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw error.message;
  }
};

// Sign Out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw error.message;
  }
};

// Reset Password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw error.message;
  }
};
