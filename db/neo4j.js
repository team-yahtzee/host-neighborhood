const neo4j = require('neo4j-driver').v1
const faker = require('faker')
const neode = require('neode')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', `pass`))
// const db = driver.session()

var db = require("seraph")
  ({ user: 'neo4j', pass: 'pass' })

const responseTimes = ['an hour', 'a few hours', 'a day', 'a week']
let policies = []
for (let i = 0; i < 4; i++) {
  policies.push(faker.lorem.sentence())
}
let cancellation = []
for (let i = 0; i < 4; i++) {
  cancellation.push(faker.lorem.sentence())
}
// 'CREATE (a:Person {name: $name}) RETURN a',
// const personName = 'Alice';
let counter = 0
let txn = db.batch();
while (counter < 100) {
  let host = {
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
    phoneNum: faker.phone.phoneNumber(),
    commuteTimeAvg: faker.random.number(),
    commutePriceAvg: faker.random.number(),
    localCurrency: faker.finance.currencyCode(),
    neighborhoodDescription: faker.lorem.paragraphs(),
    rules: policies.toString(),
    isCancelationP: faker.random.boolean(),
    cancelation: cancelation.toString(),
    locationsNearby: faker.lorem.words().toString()
    }
  db.save(host, 'Host', (err, node) => {
    if(err) {
      throw err
    } else {
      console.log(`Node #${node.id} inserted!`)
    }
  })
  counter++
}

// let resultPromise = db.run(`CREATE (host:Host 
//     })`)
//     // .then(
//     //   console.log('added successfully')
//     // )
//     // .catch(err => (
//     //   console.log(err)
//     // )


// resultPromise.then(result => {
//   db.close();

//   const singleRecord = result.records[0];
//   const node = singleRecord.get(0);

//   console.log(node);

//   // on application exit:
//   driver.close();
// })
// .catch(err => {
//   console.log(err)
// })

module.exports.db = db