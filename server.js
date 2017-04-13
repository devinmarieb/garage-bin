const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

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

//gets the count of all items
app.get('/api/junk/count', (request, response)=> {
  database('junk').select()
    .then((items)=> {
      response.status(200).json(items.length)
    })
    .catch((error)=> {
      console.error(error)
    })
})

//gets all sparkling items
app.get('/api/junk/sparkling', (request, response)=> {
  database('junk').where('cleanliness', 'sparkling').select()
    .then((items)=> {
      response.status(200).json(items.length)
    })
    .catch((error)=> {
      console.error(error)
    })
})

//gets all dusty items
app.get('/api/junk/dusty', (request, response)=> {
  database('junk').where('cleanliness', 'dusty').select()
    .then((items)=> {
      response.status(200).json(items.length)
    })
    .catch((error)=> {
      console.error(error)
    })
})

//gets all rancid items
app.get('/api/junk/rancid', (request, response)=> {
  database('junk').where('cleanliness', 'rancid').select()
    .then((items)=> {
      response.status(200).json(items.length)
    })
    .catch((error)=> {
      console.error(error)
    })
})

//sort up
app.get('/api/junk/up', (request, response)=> {
  database('junk').select().orderBy('name', 'asc')
    .then((junk)=> {
      response.status(200).json(junk)
    })
    .catch((error)=> {
      console.error(error)
    })
})

//sort down
app.get('/api/junk/down', (request, response)=> {
  database('junk').select().orderBy('name', 'desc')
    .then((junk)=> {
      response.status(200).json(junk)
    })
    .catch((error)=> {
      console.error(error)
    })
})

//get info for specific item
app.get('/api/junk/:item', (request, response)=> {
  database('junk').where('name', request.params.item).select()
    .then((item)=> {
      response.status(200).json(item)
    })
    .catch((error)=> {
      console.error(error)
    })
})

//posts a new item
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

//patches cleanliness
app.patch('/api/junk/:item', (request, response)=> {
  database('junk').where('name', request.params.item).select()
    .then((item)=> {
      let newCleanliness = request.body.cleanliness
      database('junk').where('name', request.params.item).select().update({ cleanliness: newCleanliness})
        .then(()=> {
          database('junk').where('name', request.params.item).select()
          .then((item)=> {
            response.status(200).json(item)
          })
        })
    })
    .catch((error)=> {
      console.error(error)
    })
})

if(!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`Garage Bin is running on ${app.get('port')}.`)
  })
}

module.exports = app
