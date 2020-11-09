const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db/mongoose');
const path = require('path');
// const views = require('./views')

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Public Folder (for clien-side js and custom css styles maybe)
app.use(express.static(path.join(__dirname, 'public')));

// Load View Engine @ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Connecting with mongodb
db.connect()

// Env Variables
dotenv.config()
PORT = process.env.PORT

// Route handlers
const registration = require("./routes/registration")
const login = require("./routes/login")
const filmovi = require('./routes/filmovi')
const glumci = require('./routes/glumci')
const users = require("./routes/users")

// Routes
app.use('/api/v1/filmovi', filmovi)
app.use('/api/v1/glumci', glumci)
app.use('/api/v1/users', users)
app.use('/api/v1/login', login)
app.use('/api/v1/registration', registration)

// Starting a server
const index = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

// Exporting for testing
module.exports = index
