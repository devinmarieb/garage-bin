const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.get('/', (request, response) => {
  response.send('Garage Bin')
})

//gets all junk in garage
app.get('/api/junk', (request, response)=> {
  database('junk').select()
    .then((junk)=> {
      response.status(200).json(junk)
    })
    .catch((error)=> {
      console.error(error)
    })
})

app.post('/api/junk', (request, response)=> {
  const junkItem = {name: request.body.name, reason: request.body.reason, cleanliness: request.body.cleanliness, created_at: new Date}
  database('junk').insert(junkItem)
  .then(()=> {
    database('junk').select()
      .then((junk)=> {
        response.status(200).json(junk);
      })
    .catch((error)=> {
      console.error(error)
    })
  })
})

app.listen(app.get('port'), () => {
  console.log(`Garage Bin is running on ${app.get('port')}.`)
})
