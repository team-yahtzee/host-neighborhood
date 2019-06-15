const MongoClient = require('mongodb').MongoClient
const { data } = require('./data.js')
const async = require('async')
const url = require('../config.js').MONGO_URL

MongoClient.connect(url, function(err, client) {
  if(err) throw err
  console.log("Connected successfully to server");

  const db = client.db('airbnb');

  const collection = db.collection('hosts');
  
  let counter = 0

  const insert = (callback) => {

    let hosts = []
    for (let i = 0; i < 1000; i++) {
      hosts.push(data(counter))
      counter++
    }
    collection.insertMany(hosts)
    .then(results => {
      callback(null)
    })
    .catch(err => {
      callback(err)
    })
  }

    console.log('Starting seed...')
    console.time('Seeding')
    async.whilst(
      (callback) => {
        return callback(null, counter < 10000000)
      },
      (callback) => {
        insert(() => {
          if(counter % 1000000 === 0) {
            console.log('million inserted!')
          }
          callback(null, counter)
          if(counter === 10000000) {
            console.timeEnd('Seeding')
            console.log('Seed complete!')
          }
        })
      },
      (err) => {
        if(err) {
          console.log(err)
        }
      })
    })
