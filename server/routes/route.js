const express = require('express')
const firebase = require('../config/firebase')

const router = express.Router()

// Fetch all swags from the db
router
  .route('/')
  .get(async (req, res) => {
    try {
        const allswags = []
        const swags = firebase.db.collection('swagDetails').orderBy("createdAt", "desc")
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

// Add new swag to db
router
  .route('/addswag')
  .post(async (req, res) => {
    try {
      const { name, description, url, } = req.body
      
      if (!req.files || !req.body.name || !req.body.description || !req.body.url) {
          res.status(400).send('Error, could not add data');
          return;
      }
      req.files[0].originalname = req.body.name.replace(/\s/g, "").toLowerCase()
      req.files[0].originalname = `${req.files[0].originalname}_${Date.now()}` 

       // Create new blob in the bucket referencing the file
      const blob = firebase.bucket.file(req.files[0].originalname);
  
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
              firebase.bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;
  
          const newSwag = {
              name: name,
              description: description,
              url: url,
              imgUrl: publicUrl,
              verified: false,
              createdAt: new Date()
          }
      
          await firebase.db.collection('swagDetails').add(newSwag)
          res.status(200).send(`swag added`)
      })
  
  
      blobWriter.end(req.files[0].buffer);
  } catch (error) {
      console.log(error)
      res.status(400).send("Error, could not add data")
  }
  })

// Add new message to db
router
  .route('/newmsg')
  .post(async (req, res) => {
    try {
      const { name, email, message } = req.body
  
      const newMsg = {
          name: name,
          email: email,
          message: message
      }
  
      await firebase.db.collection('messages').add(newMsg)
      res.status(200).send("Message added")
    } catch (error) {
      console.log(error)
      res.status(400).send("Failed to add message")
    }
  })

module.exports = router