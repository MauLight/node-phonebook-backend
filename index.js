const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

morgan.token('body', request => {
    return JSON.stringify(request.body)
})

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :body'))

const time = new Date()

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello Mau!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<h2>The phonebook has information about ${persons.length} people</h2><p>${time}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(400).end()
    }
})

const ranId = () => {
    const random = Math.floor(Math.random() * 999999)
    return random
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name and/or number missing.' })
    }

    const filter = persons.filter((elem) => elem.name === body.name)

    if (filter.length > 0) {
        return response.status(400).json({ error: 'name must be unique.' })
    }

    const person = {
        "name": body.name,
        "number": body.number,
        id: ranId(),
    }

    persons = persons.concat(person)
    response.json(person)
    app.use(morgan(':method :url :body'))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))