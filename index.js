// settings up express app
const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('reqStr', function getReqStr(req) {
    return JSON.stringify(req.body)
})

const app = express()

// middleware
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqStr'))
app.use(cors())

// hardcoded list of mock entries
let entries = [
    {
        id: 1,
        name: "Dogfart Hutchinson",
        number: "555-555-5555"
    },
    {
        id: 2,
        name: "Mister Mister",
        number: "123-456-7890"
    },
    {
        id: 3,
        name: "Third Guy",
        number: "It doesn't even have to be a number."
    },
    {
        id: 4,
        name: "From the top rope! It's Fourth Guy with the steel chair!",
        number: "010-110-0110"
    },
    {
        id: 5,
        name: "Gary Johnson",
        number: "000-000-0000"
    }
]

// TEST
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

// API/PERSONS
app.get('/api/persons', (request, response) => {
    console.log(entries)
    response.json(entries)
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
    
    const numNameMatches = entries.find(person => person.name.toLowerCase() === body.name.toLowerCase())
    if (numNameMatches) {
        console.log('person already exists!')
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: Math.floor(Math.random() * Math.floor(100000)),
        name: body.name,
        number: body.number 
    }
    console.log(person)

    entries = entries.concat(person)
    response.json(person)
})

// API/PERSONS/<ID>
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = entries.find(person => person.id === id)
    
    if (person) {
        console.log(person)
        response.json(person)
    } else {
        console.log('person not found!')
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    entries = entries.filter(person => person.id !== id)
    console.log(`deleted person with id ${id}`)
    response.status(204).end()
})

// INFO
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${entries.length} people</p>\n
                   <p>${new Date()}</p>`)
})

// initialize express app on the given port
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})