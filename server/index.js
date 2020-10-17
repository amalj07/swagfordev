const express = require('express')
const connectDb = require('./config/db')

const app = express()

// Connect to Database
connectDb()

const PORT = 5000
app.listen(PORT, () => {
    console.log(`🚀Server listening on port: ${PORT}`)
})