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
        done()
      })
    })
  })

})
