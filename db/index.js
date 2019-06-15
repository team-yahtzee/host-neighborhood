const MongoClient = require('mongodb').MongoClient
const url = require('../config.js').MONGO_URL


module.exports = {
  getHostInformation: (id, callback) => {
    MongoClient.connect(url, (err, client) => {
      if (err) throw err

        console.log('connected to database!')
        const db = client.db('airbnb')
        const collection = db.collection('hosts')
        collection.findOne({
          id: id
        }, (err, data) => {
          if(err) {
            callback(err)
            
          } else {
            console.log('record found!')
            callback(null, data)
          }
        })
    })
  }
}