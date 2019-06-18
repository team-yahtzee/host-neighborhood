const mongo = require('mongodb').MongoClient
const mongoose = require('mongoose')

let db = mongoose.connect('mongodb://localhost:27017/airbnb', {
  useNewUrlParser: true,
  poolSize: 1000,
  keepAlive: true,
  reconnectTries: 30
})
  .then(connect => {
    console.log('connected to database')
  })
  .catch(err => {
    console.log('Error connecting to database: ', err)
  })

let hostSchema = {
  id: Number,
  name: String,
  joined: Date,
  location: String,
  city: String,
  numberOfReviews: Number,
  numberOfReferences: Number,
  isVerified: Boolean,
  isSuper: Boolean,
  responseRate: Number,
  avatar: String,
  responseTime: String,
  languages: String,
  email: String,
  phoneNumber: String,
  commuteTimeAverage: Number,
  commutePriceAverage: Number,
  localCurrency: String,
  neighborhoodDescription: String,
  rules: String,
  isCancellationPossible: Boolean,
  cancellation: String,
  locationsNearby: String
}

let Host = mongoose.model('Host', hostSchema)

let messageSchema = {
  toHost: String,
  messageBody: String
}

let Message = mongoose.model('Message', messageSchema)

module.exports = {
  Host, Message, db
}