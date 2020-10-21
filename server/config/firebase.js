const admin = require('firebase-admin')

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./swagfordevs-firebase-adminsdk-cwq6s-3fb8c40c45.json')),
  storageBucket: process.env.STORAGEBUCKET
})

// firestore
const db = admin.firestore()

// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  db,
  bucket
}