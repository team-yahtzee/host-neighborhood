const pg = require('pg')
const { connect } = require('./index.js')
const string = require('../config.js').PG_CONNECT
const async = require('async')
const { data, createHostsTable } = require('./data.js')

const pgp = require('pg-promise')({
  capSQL: true
})

const db = pgp(string)
const knex = require('knex')({
  client: 'pg',
  connection: string,
})


creates table - comment out to re-create table
createHostsTable()

// our set of columns, to be created only once, and then shared/reused,
// to let it cache up its formatting templates for high performance:
const cs = new pgp.helpers.ColumnSet(['name','joined','location',
  'city','numberOfReviews','numberOfReferences',
  'isVerified','isSuper','responseRate','avatar',
  'responseTime','languages','email','phoneNumber',
  'commuteTimeAverage','commutePriceAverage','localCurrency',
  'neighborhoodDescription','rules','isCancellationPossible',
  'cancellationPolicy','locationsNearby'], {table: 'hosts'});

let counter = 0

const insert = (callback) => {
  let hosts = []
  for (let i = 0; i < 1000; i++) {
    hosts.push(data())
  }
  // generating a multi-row insert query:
  let query = pgp.helpers.insert(hosts, cs);

  // executing the query
  db.none(query)
    .then(result => {
      callback(null)
    }
    )
    .catch(error => {
        callback(err)
    });

}


console.log('Starting seed...')
console.time('Seeding')

async.whilst(
  (callback) => {
    return callback(null, counter < 10000000)
  },
  (callback) => {
    insert(() => {
      counter += 1000
      callback(null, counter)
      if(counter % 1000000 === 0) {
        console.log('million inserted!')
      }
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