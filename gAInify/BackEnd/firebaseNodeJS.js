const admin = require('firebase-admin');
const serviceAccount = require("../gainifydatabase-firebase-adminsdk-xxgai-acc1135d22.json");
require('dotenv').config();




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Firestore reference
const db = admin.firestore();


// Export the Firestore instance for use in other modules
module.exports = { db };
