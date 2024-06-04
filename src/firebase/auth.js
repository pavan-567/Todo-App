import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

export const CreateUser = async (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const SignIn = async (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const SignOut = async () => auth.signOut();


// Not Used For Now
export const passwordReset = (email) => sendPasswordResetEmail(auth, email);
export const passwordChange = (password) =>
  updatePassword(auth.currentUser, password);

export const emailVerification = () =>
  sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
