import app from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/functions"; // <- needed if using functions
import { FIREBASE_CONFIG } from "./config";

class Firebase {
  db: app.firestore.Firestore;
  analytics: app.analytics.Analytics;
  functions: app.functions.Functions;
  auth: app.auth.Auth;
  GoogleAuthProvider: app.auth.GoogleAuthProvider;
  fieldValue: typeof app.firestore.FieldValue;
  constructor() {
    app.initializeApp(FIREBASE_CONFIG);
    this.fieldValue = app.firestore.FieldValue;
    this.db = app.firestore();
    this.analytics = app.analytics();
    this.functions = app.functions();
    this.auth = app.auth();
    this.GoogleAuthProvider = new app.auth.GoogleAuthProvider();
  }
}

const FirebaseApp = new Firebase();

export { FirebaseApp, Firebase };
