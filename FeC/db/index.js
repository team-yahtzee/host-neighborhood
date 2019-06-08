const { Pool, Client } = require('pg')
const connectionString = require('../config.js').PG_CONNECT

const pool = new Pool({
  connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
  pool.end()
})

const client = new Client({
  connectionString: connectionString,
})

const connect = client.connect((err) => {
  if(err) {
    console.log(err)
  } else {
    console.log('Connected to database!')
  }
})

client.query('SELECT NOW()', (err, res) => {
  client.end()
})

module.exports = {
  connect
}