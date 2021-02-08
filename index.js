// settings up express app
require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectID
const Person = require('./models/person')

morgan.token('reqStr', function getReqStr(req) {
    return JSON.stringify(req.body)
})

const app = express()

// middleware
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqStr'))
app.use(cors())

// TEST
app.get('/hi', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

// API/PERSONS
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        console.log('name is missing!')
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    if (!body.number) {
        console.log('number is missing!')
        return response.status(400).json({
            error: 'number is missing'
        })
    }
    
    // const numNameMatches = Person.find({
    //     name: body.name
    // }).count() > 0
    // console.log('New person already exist?', numNameMatches)

    // if (numNameMatches) {
    //     console.log('person already exists!')
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person(
        {
            id: Math.floor(Math.random() * Math.floor(100000)),
            name: body.name,
            number: body.number 
        }
    )
    console.log(person)

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

// API/PERSONS/<ID>
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then( foundPerson => {
            console.log(`Found ${foundPerson.name} with id ${request.params.id}`)
            response.json(foundPerson)
        }
    )
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then( result => {
            console.log(`deleted person with id ${request.params.id}`)
            response.status(204).end()
        })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// INFO
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${entries.length} people</p>\n
                   <p>${new Date()}</p>`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)

// initialize express app on the given port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})