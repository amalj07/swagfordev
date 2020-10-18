const express = require('express')
const admin = require('firebase-admin')
const cors = require('cors')
const multer = require('multer')
const serviceAccount = require('./config')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))

// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.serviceAccountKey),
    storageBucket: "swagfordevs.appspot.com"
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


app.get('/', async(req, res) => {
    const allswags = []
    const swags = db.collection('swagDetails')
    const snapshot = await swags.get()
    snapshot.forEach(doc => {
        allswags.push({id: doc.id, name: doc.data().name, description: doc.data().description, url: doc.data().url, imgUrl: doc.data().imgUrl})
    })

    res.send(allswags)
})

app.post('/addswag', async(req, res) => {
    try {
        const { name, description, url, } = req.body
        
        if (!req.files) {
            res.status(400).send('Error, could not add data');
            return;
        }

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
            const imgURl = `gs://${bucket.name}/${encodeURI(blob.name)}`
    
            const newSwag = {
                name: name,
                description: description,
                url: url,
                imgUrl: imgURl,
                createdAt: new Date()
            }
        
            const result = await db.collection('swagDetails').add(newSwag)
            res.status(200).send(`swag id: ${result.id}`)
        })
    
    
        blobWriter.end(req.files[0].buffer);
    } catch (error) {
        console.log(error)
        res.status(400).send("Error, could not add data")
    }
})



const PORT = 5000
app.listen(PORT, () => {
    console.log(`🚀Server listening on port: ${PORT}`)
})