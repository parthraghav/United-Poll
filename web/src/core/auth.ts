import { FirebaseApp } from "../firebase";

export const loginWithGoogle = async () => {
  await FirebaseApp.auth.signInWithRedirect(FirebaseApp.GoogleAuthProvider);
};

export const logout = async () => {
  await FirebaseApp.auth.signOut();
};
