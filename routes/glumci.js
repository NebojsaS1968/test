const express = require('express')
const router = express.Router()

const Glumci = require('../controllers/glumci')

const {
  vratiSveGlumce,
  vratiGlumcaPoImenuIPrezimenu,
  vratiNagradeGlumca,
  vratiFilmoveGlumca
} = Glumci

router.get('/', vratiSveGlumce)
router.get('/:imePrezime', vratiGlumcaPoImenuIPrezimenu)
router.get('/:imePrezime/nagrade', vratiNagradeGlumca)
router.get('/:imePrezime/filmovi', vratiFilmoveGlumca)

module.exports = router
