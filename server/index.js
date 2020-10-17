const express = require('express')
const admin = require('firebase-admin')
const serviceAccount = require('./config')

const app = express()

app.use(express.urlencoded({extended: false}))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.serviceAccountKey)
})

const db = admin.firestore()

app.post('/addswag', async(req, res) => {
    const { name, description, url, imgUrl } = req.body

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