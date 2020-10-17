const mongoose = require('mongoose')
const config = require('./config')

const connectDb = () => {
    mongoose.connect(config.mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("MongoDB Connected..")
        })
		.catch(error => {
				console.log(error)
		})

	mongoose.connection.on('error', err => {
    logError(err)
  })
}

module.exports = connectDb