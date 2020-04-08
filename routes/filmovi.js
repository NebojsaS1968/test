const express = require('express')
const router = express.Router()
const Filmovi = require('../controllers/filmovi')

const { vratiSveFilmove, vratiFilmovePoNazivu, vratiOpisFilma, dodajFilm, izbrisiFilm, azurirajFilm } = Filmovi

router.route('/').get(vratiSveFilmove).post(dodajFilm)
router.route('/:id').get(vratiFilmovePoNazivu).delete(izbrisiFilm).patch(azurirajFilm)
router.get('/:naziv/opis', vratiOpisFilma)

module.exports = router