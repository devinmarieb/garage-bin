process.env.NODE_ENV = 'test'

const chai = require('chai')
const expect = chai.expect
const should = chai.should
const assert = chai.assert
const chaiHttp = require('chai-http')
const app = require('../server.js')
chai.use(chaiHttp)

const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('Garage Bin', ()=> {
  beforeEach(function(done) {
    database.migrate.rollback()
     .then(function() {
       database.migrate.latest()
       .then(function() {
           done()
       })
     })
  })

afterEach(function(done) {
  database.migrate.rollback()
  .then(()=> {
    done()
  })
})

  describe('GET /api/junk', ()=> {
    it('should return all garage list items', (done)=> {
      chai.request(app)
      .get('/api/junk')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        done()
      })
    })
  })

  describe('GET /api/junk/count', ()=> {
    it('should return get the count of all items', (done)=> {
      chai.request(app)
      .get('/api/junk/count')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        done()
      })
    })
  })

  describe('GET /api/junk/sparkling', ()=> {
    beforeEach((done)=> {
      database('junk').insert({
        name: 'car',
        reason: 'because',
        cleanliness: 'sparkling'
      }).then(()=> {
        done()
      })
    })
    it('should return all items that are sparkling', (done)=> {
      chai.request(app)
      .get('/api/junk/sparkling')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        done()
      })
    })
  })

  describe('GET /api/junk/dusty', ()=> {
    beforeEach((done)=> {
      database('junk').insert({
        name: 'car',
        reason: 'because',
        cleanliness: 'dusty'
      }).then(()=> {
        done()
      })
    })
    it('should return all items that are dusty', (done)=> {
      chai.request(app)
      .get('/api/junk/dusty')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        done()
      })
    })
  })

  describe('GET /api/junk/rancid', ()=> {
    beforeEach((done)=> {
      database('junk').insert({
        name: 'car',
        reason: 'because',
        cleanliness: 'rancid'
      }).then(()=> {
        done()
      })
    })
    it('should return all items that are rancid', (done)=> {
      chai.request(app)
      .get('/api/junk/rancid')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        done()
      })
    })
  })

  describe('GET /api/junk/up', ()=> {
    beforeEach((done)=> {
      database('junk').insert({
        name: 'car',
        reason: 'because',
        cleanliness: 'rancid'
      }).then(()=> {
        done()
      })
    })
    it('should sort up', (done)=> {
      chai.request(app)
      .get('/api/junk/up')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        done()
      })
    })
  })

  describe('GET /api/junk/down', ()=> {
    beforeEach((done)=> {
      database('junk').insert({
        name: 'car',
        reason: 'because',
        cleanliness: 'rancid'
      }).then(()=> {
        done()
      })
    })
    it('should sort down', (done)=> {
      chai.request(app)
      .get('/api/junk/down')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        done()
      })
    })
  })

  describe('GET /api/junk/:item', ()=> {
    beforeEach((done)=> {
      database('junk').insert({
        name: 'car',
        reason: 'because',
        cleanliness: 'rancid'
      }).then(()=> {
        done()
      })
    })
    it('should get a specific item', (done)=> {
      chai.request(app)
      .get('/api/junk/car')
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('object')
        expect(response.body[0].name).to.equal('car')
        expect(response.body[0].reason).to.equal('because')
        expect(response.body[0].cleanliness).to.equal('rancid')
        done()
      })
    })
  })

  describe('POST /api/junk', ()=> {
    it('should post a new item', (done)=> {
      chai.request(app)
      .post('/api/junk')
      .send({
        name: 'bird cage',
        reason: 'i might get a bird',
        cleanliness: 'dusty'
      })
      .end((error, response)=> {
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response.body).to.be.a('array')
        expect(response.body[0].name).to.equal('bird cage')
        expect(response.body[0].reason).to.equal('i might get a bird')
        expect(response.body[0].cleanliness).to.equal('dusty')
        done()
      })
    })
  })

  describe('PATCH /api/junk/:item', ()=> {
    beforeEach((done)=> {
      database('junk').insert({
        name: 'car',
        reason: 'because',
        cleanliness: 'dusty'
      }).then(()=> {
        done()
      })
    })
  it('should edit an items cleanliness', (done)=> {
    chai.request(app)
    .patch('/api/junk/car')
    .send({
      cleanliness: 'sparkling'
    })
    .end((error, response)=> {
      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.be.a('array')
      expect(response.body[0].cleanliness).to.equal('sparkling')
      done()
    })
  })
})


})
