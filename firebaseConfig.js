import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD3aAVj4wNy2AljX52lC_-LbvqfTMIpML8",
  authDomain: "cashbackapp-639c6.firebaseapp.com",
  databaseURL: "https://cashbackapp-639c6-default-rtdb.firebaseio.com",
  projectId: "cashbackapp-639c6",
  storageBucket: "cashbackapp-639c6.appspot.com",
  messagingSenderId: "1029177231754",
  appId: "1:1029177231754:web:454910061df2cc9ec62073",
  measurementId: "G-5YYL24NHH4"
};
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: inMemoryPersistence,
  dataConverter: null,
});

const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database }; // Export the db variable
