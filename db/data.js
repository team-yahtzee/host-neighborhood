const faker = require('faker')
const string = require('../config.js').PG_CONNECT
const knex = require('knex')({
  client: 'pg',
  connection: string,
})


const data = (counter) => {
  const responseTimes = ['an hour', 'a few hours', 'a day', 'a week']
  let policies = []
  for (let i = 0; i < 4; i++) {
    policies.push(faker.lorem.sentence())
  }
  let cancellation = []
  for (let i = 0; i < 4; i++) {
    cancellation.push(faker.lorem.sentence())
  }

  let host = {
    id: counter,
    name: faker.name.findName(),
    joined: faker.date.past(),
    location: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.zipCode()}`,
    city: faker.address.city(),
    numberOfReviews: faker.random.number(),
    numberOfReferences: faker.random.number(),
    isVerified: faker.random.boolean(),
    isSuper: faker.random.boolean(),
    responseRate: faker.random.number({'min': 10, 'max': 100}),
    avatar: faker.image.avatar(),
    responseTime: responseTimes[Math.floor(Math.random() * responseTimes.length)],
    languages: faker.random.locale(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    commuteTimeAverage: faker.random.number(),
    commutePriceAverage: faker.random.number(),
    localCurrency: faker.finance.currencyCode(),
    neighborhoodDescription: faker.lorem.paragraphs(),
    rules: policies.toString(),
    isCancellationPossible: faker.random.boolean(),
    cancellationPolicy: cancellation.toString(),
    locationsNearby: faker.lorem.words().toString(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  }
  return host
}

let createHostsTable = () => {
  // knex.schema.dropTableIfExists('hosts')
  //   .then(resolve => {
  //     console.log(resolve)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
    knex.schema.createTable('hosts', (table) => {
      table.increments()
      table.text('name')
      table.date('joined')
      table.text('location')
      table.text('city')
      table.integer('numberOfReviews')
      table.integer('numberOfReferences')
      table.boolean('isVerified')
      table.boolean('isSuper')
      table.integer('responseRate')
      table.text('avatar')
      table.text('responseTime')
      table.text('languages')
      table.text('email')
      table.text('phoneNumber')
      table.integer('commuteTimeAverage')
      table.integer('commutePriceAverage')
      table.text('localCurrency')
      table.text('neighborhoodDescription')
      table.text('rules')
      table.boolean('isCancellationPossible')
      table.text('cancellationPolicy')
      table.text('locationsNearby')
  })
    .then(resolve => {
      console.log(resolve)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  data, createHostsTable
}