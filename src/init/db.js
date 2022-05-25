const mongoose = require('mongoose')
const eventEmitter = require('../utils/event')
const { DB_CONNECTION_EVENT } = require('../utils/constants')

// Mongoose connection
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
const connectionUrl = process.env.MONGO_URL

mongoose.connect(connectionUrl, mongooseOptions)

mongoose.connection.on('connected', () => eventEmitter.emit('db-connected'))
mongoose.connection.on('error', (err) => console.error('MongoDB connection error: ', err))

module.exports = mongoose.connection