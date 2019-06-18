var { db, Host, Message } = require('./index.js')

module.exports = {
  getHostInformation: (id, callback) => {
    return Host.findOne({
      id: id
    })
    .then(data => {
      callback(null, data)
    })
    .catch(err => {
      callback(err)
    })
  },
  sendMessage: (id, text, callback) => {
    return Message.create({
      toHost: id,
      messageBody: text
    })
    .then(data => {
      console.log('message sent!')
      callback(null, data)
    })
    .catch(err => {
      console.log('error sending message:', err)
    })
  },
  getMessageHistory: (id, callback) => {
    return Message.find({
      toHost: id
    })
    .then(data => {
      console.log('messages retrieved!')
    })
    .catch(err => {
      console.log('error retrieving message history: ', err)
    })
  }
}