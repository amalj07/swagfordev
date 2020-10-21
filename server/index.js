const express = require('express')
require('dotenv').config()
const admin = require('firebase-admin')
const cors = require('cors')
const multer = require('multer')

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

// Initiate a memory storage engine to store file as Buffer objects
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB size
    }
})
app.use(upload.any())

// Routes
app.use('/', require('./routes/route'))
app.use('/addswag', require('./routes/route'))
app.use('/newmsg', require('./routes/route'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🚀Server listening on port: ${PORT}`)
})