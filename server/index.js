const express = require('express')
require('dotenv').config()
const admin = require('firebase-admin')
const cors = require('cors')
const multer = require('multer')
const serviceAccount = require('./config')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.serviceAccountKey),
    storageBucket: process.env.STORAGEBUCKET
})

// firestore
const db = admin.firestore()

// Cloud storage
const bucket = admin.storage().bucket()

// Initiate a memory storage engine to store file as Buffer objects
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB size
    }
})
app.use(upload.any())

// Fetch all swags
app.get('/', async(req, res) => {
    try {
        const allswags = []
        const swags = db.collection('swagDetails').orderBy("createdAt", "desc")
        const snapshot = await swags.where('verified', '==', true).get()
        snapshot.forEach(doc => {
            allswags.push({id: doc.id, name: doc.data().name, description: doc.data().description, url: doc.data().url, imgUrl: doc.data().imgUrl})
        })
    
        res.status(200).send(allswags)
    } catch (error) {
        console.log(error)
        res.status(400).send("Error, could not fetch data")
    }
})

// Add new swag
app.post('/addswag', async(req, res) => {
    try {
        const { name, description, url, } = req.body
        
        if (!req.files || !req.body.name || !req.body.description || !req.body.url) {
            res.status(400).send('Error, could not add data');
            return;
        }
        req.files[0].originalname = req.body.name.replace(/\s/g, "").toLowerCase()
        req.files[0].originalname = `${req.files[0].originalname}_${Date.now()}` 

         // Create new blob in the bucket referencing the file
        const blob = bucket.file(req.files[0].originalname);
    
         // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.files[0].mimetype
            }
        })
    
        blobWriter.on('error', (err) => {
            console.log(err)
        })
    
        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;
    
            const newSwag = {
                name: name,
                description: description,
                url: url,
                imgUrl: publicUrl,
                verified: false,
                createdAt: new Date()
            }
        
            await db.collection('swagDetails').add(newSwag)
            res.status(200).send(`swag added`)
        })
    
    
        blobWriter.end(req.files[0].buffer);
    } catch (error) {
        console.log(error)
        res.status(400).send("Error, could not add data")
    }
})

// Add new message
app.post('/newmsg', async(req, res) => {
    try {
        const { name, email, message } = req.body
    
        const newMsg = {
            name: name,
            email: email,
            message: message
        }
    
        await db.collection('messages').add(newMsg)
        res.status(200).send("Message added")
    } catch (error) {
        console.log(error)
        res.status(400).send("Failed to add message")
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🚀Server listening on port: ${PORT}`)
})