import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if config is valid (at least apiKey is required)
const isConfigValid = !!firebaseConfig.apiKey;

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (isConfigValid) {
  // Prevent multiple initializations
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
} else {
  console.warn(
    "Firebase config is missing. Authentication features will not work.",
  );
}

export { app, auth };
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const isFirebaseInitialized = isConfigValid;
