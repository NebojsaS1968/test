const express = require('express')
const router = express.Router()
const { validacija } = require("../middlewares/validation/validate")
const { auth } = require("../middlewares/validation/auth")

const {
    addFilmSchema,
    updateFilmSchema,
  } = require("../middlewares/validation/schemas/filmovi")
const Filmovi = require('../controllers/filmovi')

const {
   getAllFilms,
   getFilmById, 
   getFilmPlot, 
   addFilm, 
   deleteFilm, 
   updateFilm,
   getFilmByTitle,
   deleteAllFilms 
  } = Filmovi

router.route('/')
.get(auth, getAllFilms) 
.post(auth, addFilm) 
.delete(auth, deleteAllFilms)

router.route('/:id')
.get(auth, getFilmById)
.put([auth, validacija(addFilmSchema)], updateFilm)
.delete(auth, deleteFilm)
.patch([auth, validacija(updateFilmSchema)], updateFilm)

router.get('/:id/plot', auth, getFilmPlot)
router.get("/search/:title", getFilmByTitle)



module.exports = router