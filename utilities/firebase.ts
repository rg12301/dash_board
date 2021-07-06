// Imports
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// -----------------------------------------------------------------------------
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Firebase project initialization
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

// -----------------------------------------------------------------------------
export enum COLLECTIONS {
    PROJECTS = 'PROJECTS',
    USERS = 'USERS',
    MEMBERS = 'MEMBERS',
    ARTICLES = 'ARTICLES',
}

// -----------------------------------------------------------------------------
export const firestore = firebase.firestore;
export const auth = firebase.auth;
export const storage = firebase.storage;

export default firebase;
