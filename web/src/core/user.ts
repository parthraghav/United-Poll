import { FirebaseApp } from "../firebase";

export const registerUserInfo = async () => {
  const currentUser = FirebaseApp.auth.currentUser;
  // Terminate if user is not logged in
  if (!currentUser) return;
  const users = FirebaseApp.db.collection("users");
  const userRef = users.doc(currentUser.uid);
  // Terminate if user is already registered;
  if ((await userRef.get()).exists) return;
  // Build User Doc
  const userDoc = {
    id: currentUser.uid,
    uid: currentUser.uid,
    name: currentUser.displayName,
    email: currentUser.email,
    created_at: FirebaseApp.fieldValue.serverTimestamp(),
  };
  // Perform the operation
  await userRef.set(userDoc);
  console.log(userDoc);
};
