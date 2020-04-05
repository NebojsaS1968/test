const express = require('express')
const router = express.Router()
const Serije = require('../controllers/serije')

const {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije,
  dodajSeriju
} = Serije

router.get('/', vratiSveSerije)
router.get('/:naziv', vratiSerijuPoNazivu)
router.get('/:naziv/opis', vratiOpisSerije)
router.get('/:naziv/epizode', vratiEpizodeSerije)

router.post('/', dodajSeriju)

module.exports = router
