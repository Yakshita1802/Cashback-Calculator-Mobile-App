import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAvYbKzJNaKRNZtMtAFUEZAtzinnX3laIM",
  authDomain: "cashback-web-app.firebaseapp.com",
  databaseURL: "https://cashback-web-app-default-rtdb.firebaseio.com",
  projectId: "cashback-web-app",
  storageBucket: "cashback-web-app.appspot.com",
  messagingSenderId: "1043544354212",
  appId: "1:1043544354212:web:a5bd8e2b574a1ce1cb2531"
};
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: inMemoryPersistence,
  dataConverter: null,
});

const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database }; // Export the db variable
