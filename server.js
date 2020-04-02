const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser')

const filmovi = require('./routes/filmovi')
const serije = require('./routes/serije')
const glumci = require('./routes/glumci')

app.use('/api/v1/filmovi', filmovi)
app.use('/api/v1/serije', serije)
app.use('/api/v1/glumci', glumci)

//NOT WORKING???
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, () => console.log('Server is listening on port 3000'))
