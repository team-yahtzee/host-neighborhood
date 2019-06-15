const express = require('express')
const db = require('../db/postgresql.js').db
const parser = require('body-parser')
const path = require('path')
const cors = require('cors');
// const getHostsById = require('../db/dbHelpers.js').getHostsById
// const postMessageToHost = require('../db/dbHelpers.js').postMessageToHost
// const getMessagehistrory = require('../db/dbHelpers.js').getMessagehistrory

// set up header to prevent CORS errors and use in middleware
const headers = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
}

const app = express()

app.get('*.js', function (req, res, next) {
  console.log('js requested');
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(parser.json())
app.use(cors(headers))

app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

// gets all the data from the database on corresponding user id from request params 
app.get(`/host/:id`, (req, res) => {
  let id = JSON.stringify(req.params.id)
  
  getHostsById(id, (err, data) => {
    if (err) {
      console.error(err, `<-- Error occured on retreiving all the hosts from db`);
      res.status(500)
    } else {
      res.send(data)
    }
  })
})

// repsonsible for sending the message to the host 
app.post('/contact/:host/message', (req, res) => {

  let host = JSON.stringify(req.params.host.split('+').join(' '))

  postMessageToHost(host, req.body.messageBody, (err) => {
    if (err) {
      console.error(err, ' <-- Error occured on sending a message to host');
      res.sendStatus(500)
    } else res.sendStatus(201)
  })
})


// retrieves the message history with the given host 
app.get('/contact/:host/message', (req, res) => {

  let host = '%' + req.params.host.split(' ').join('%') + '%'

  getMessagehistrory(host, (err, data) => {
    if (err) {
      console.error(err, ' <-- Error occured on getting message history');
      res.sendStatus(500)
    } else res.send(data)
  })
})



let port = 3005
app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})