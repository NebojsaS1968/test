const express = require('express')
const router = express.Router()
const Filmovi = require('../controllers/filmovi')

const { vratiSveFilmove, vratiFilmovePoNazivu, vratiOpisFilma, dodajFilm, sortFilm } = Filmovi

router.get('/', vratiSveFilmove)
router.get('/:naziv', vratiFilmovePoNazivu)
router.get('/:naziv/opis', vratiOpisFilma)

router.post('/', dodajFilm)

module.exports = router