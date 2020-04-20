const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
  .connect("mongodb://localhost:27017/testing", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err))

const filmovi = require('./routes/filmovi')
const serije = require('./routes/serije')
const glumci = require('./routes/glumci')
const genres = require('./routes/genres')
const users = require("./routes/users")
const login = require("./routes/login")
const registration = require("./routes/registration")

app.use('/api/v1/filmovi', filmovi)
app.use('/api/v1/serije', serije)
app.use('/api/v1/glumci', glumci)
app.use('/api/v1/genres', genres)
app.use('/api/v1/users', users)
app.use('/api/v1/login', login)
app.use('/api/v1/registration', registration)

app.listen(port, () => console.log('Server is listening on port 3000'))
