const express = require('express')
const admin = require('firebase-admin')
const serviceAccount = require('./config')
const app = express()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.serviceAccountKey)
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`🚀Server listening on port: ${PORT}`)
})