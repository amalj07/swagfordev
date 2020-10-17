const express = require('express')
const admin = require('firebase-admin')
const serviceAccount = require('./config')

const app = express()

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

// Upload file to cloud storage
async function uploadFile() {
    const filename = '../client/static/download.jpeg'
    await bucket.upload(filename, {
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        }
    })

    return `gs://${bucket.name}/${filename}`
}

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
    const { name, description, url } = req.body

    const imgUrl = await uploadFile().catch(console.error);    

    const newSwag = {
        name: name,
        description: description,
        url: url,
        imgUrl: imgUrl,
        createdAt: new Date()
    }

    const result = await db.collection('swagDetails').add(newSwag)

    res.send(`New swag added with swag id: ${result.id}`)
})



const PORT = 5000
app.listen(PORT, () => {
    console.log(`🚀Server listening on port: ${PORT}`)
})