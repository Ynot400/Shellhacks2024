const admin = require('firebase-admin');
require('dotenv').config();

// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),  // or use a service account
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

// Firestore reference 
const db = admin.firestore();

// Export the Firestore instance for use in other modules
module.exports = { db };
