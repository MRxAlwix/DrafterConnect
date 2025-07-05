import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDO5wF_iRkyJJZhGglnQ2ATclfml-rxkp0",
  authDomain: "pkl-app-b3bff.firebaseapp.com",
  databaseURL: "https://pkl-app-b3bff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pkl-app-b3bff",
  storageBucket: "pkl-app-b3bff.appspot.com",
  messagingSenderId: "355172295664",
  appId: "1:355172295664:web:aff7001794b2efcca1b335",
  measurementId: "G-GS5G5VG6T7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };

// Development emulator setup (uncomment for local development)
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectStorageEmulator(storage, 'localhost', 9199);
// }

export default app;