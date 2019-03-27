const faker = require('faker')
let sqlite3 = require('sqlite3').verbose()

const path = require('path')
const dbPath = path.resolve(__dirname, 'schema.db')
const db = new sqlite3.Database(dbPath)

db.run(`CREATE TABLE hosts_neighborhood(
  id INTEGER Primary key,
  name VARCHAR, 
  joined DATE, 
  location INTEGER,
  isVerified BOOLEAN, 
  isSuper BOOLEAN, 
  responseRate INTEGER, 
  responseTime INTEGER, 
  language VARCHAR,
  email VARCHAR, 
  phoneNum VARCHAR,
  thingsAround VARCHAR, 
  commuteTimeAvg INTEGER,
  commutePriceAvg INTEGER,
  neighborhoodDescr VARCHAR,
  address VARCHAR,
  policies VARCHAR, 
  isCanc BOOLEAN,
  cancelation VARCHAR
)`)

for (let i = 0; i < 100; i++) {
  let entry = new host_neighborhood()
  db.run(`INSERT INTO hosts_neighborhood (id,name,joined,location,isVerified,isSuper,responseRate,responseTime,language
  ,email, phoneNum,thingsAround,commuteTimeAvg,commutePriceAvg,neighborhoodDescr,address,policies,isCanc, cancelation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, Object.values(entry), (err) => {
    if (err) console.log(err, 'Error occured on insert')
    else{
    console.log('inserted successfully')
    }
  })
}

db.close();


faker.seed(123)

function host_neighborhood() {
  let thingsNearby = []

  for (let i = 0; i < 4; i++) {
    thingsNearby.push(faker.random.word())
  }


  let policies = []
  for (let i = 0; i < 4; i++) {
    policies.push(faker.lorem.sentence())
  }

  let cancelation = []
  for (let i = 0; i < 4; i++) {
    cancelation.push(faker.lorem.sentence())
  }


  this.id = faker.random.number()
  this.name = faker.name.findName();
  this.joined = faker.date.past();
  this.location = faker.random.number()
  this.isVerified = faker.random.boolean();
  this.isSuper = faker.random.boolean();
  this.responseRate = faker.random.number()
  this.responseTime = faker.random.number()
  this.languages = faker.random.locale()
  this.email = faker.internet.email()
  this.phoneNum = faker.phone.phoneNumber()
  this.name = faker.random.word();
  this.thingNearby = thingsNearby.toString();
  this.commuteTimeAvg = faker.random.number();
  this.commutePriceAvg = faker.random.number()
  this.nwighborhoodDescription = faker.lorem.paragraphs()
  this.id = faker.random.number();
  this.address = faker.address.streetAddress();
  this.rules = policies.toString();
  this.isCancelationP = faker.random.boolean()
  this.cancelation = cancelation.toString();
}

let h = new  host_neighborhood()
console.log(Object.values(h))