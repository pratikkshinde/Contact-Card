import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore'; // Uncomment if using Firestore
// import { getAuth } from 'firebase/auth'; // Uncomment if using Auth

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

export default app;
