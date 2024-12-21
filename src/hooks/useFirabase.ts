import { firabaseConfig } from "@/infra/firabase";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const useFirabase = () => {
  const app = initializeApp(firabaseConfig);
  const db = getDatabase();
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);

  setPersistence(auth, browserSessionPersistence);
  return {
    app,
    db,
    auth,
    signInWithPopup,
    signOut,
    googleProvider,
  };
};
