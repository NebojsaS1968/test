const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const db = require('./db/mongoose')

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connecting with mongodb
db.connect()

dotenv.config()
PORT = process.env.PORT

// Route handlers
const registration = require("./routes/registration")
const login = require("./routes/login")
const filmovi = require('./routes/filmovi')
const glumci = require('./routes/glumci')
const genres = require('./routes/genres')
const users = require("./routes/users")

// Routes
app.use('/api/v1/filmovi', filmovi)
app.use('/api/v1/glumci', glumci)
app.use('/api/v1/genres', genres)
app.use('/api/v1/users', users)
app.use('/api/v1/login', login)
app.use('/api/v1/registration', registration)

// Starting a server
const index = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

// Exporting for testing
module.exports = index
