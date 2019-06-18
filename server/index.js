const express = require('express')
const parser = require('body-parser')
const path = require('path')
const cors = require('cors')

const { getHostInformation, sendMessage, getMessageHistory } = require('../db/methods.js')

// set up header to prevent CORS errors and use in middleware
const headers = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type'
}
const app = express()

// app.get('*.js', function (req, res, next) {
//   let split = req.url.split('/')
//   let url
//   for (let i = 0; i < split.length; i++) {
//     if(split[i].length > 1) {
//       url = split[i]
//     }
//   }
//   console.log('js requested');
//   req.url = url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });

app.use(parser.json())
app.use(cors(headers))

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

// gets all the data from the database on corresponding user id from request params 
app.get(`/host/:id`, (req, res) => {
  let id = req.params.id
  getHostInformation(id, (err, data) => {
    if(err) {
      console.error('ERROR OCCURRED: ', err)
      res.sendStatus(500)
    } else {
      console.log(data)
      res.send(data)
    }
  })
})

// responsible for sending the message to the host 
app.post('/contact/:host/message', (req, res) => {

  let host = JSON.stringify(req.params.host.split('+').join(' '))

  sendMessage(host, req.body.messageBody, (err) => {
    if (err) {
      console.error(err, ' <-- Error occured on sending a message to host');
      res.sendStatus(500)
    } else res.sendStatus(201)
  })
})

// retrieves the message history with the given host 
app.get('/contact/:host/message', (req, res) => {

  let host = '%' + req.params.host.split(' ').join('%') + '%'

  getMessageHistory(host, (err, data) => {
    if (err) {
      console.error(err, ' <-- Error occured on getting message history');
      res.sendStatus(500)
    } else res.send(data)
  })
})



let PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})