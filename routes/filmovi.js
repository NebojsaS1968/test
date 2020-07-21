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
.get(getAllFilms) // Removed auth for testing reasons
.post(validacija(addFilmSchema), addFilm)  // Removed auth for testing reasons
.delete(auth, deleteAllFilms)

router.route('/:id')
.get(getFilmById)
.put([auth, validacija(addFilmSchema)], updateFilm)
.delete(deleteFilm) // Removed auth for testing reasons
.patch([auth, validacija(updateFilmSchema)], updateFilm)

router.get('/:id/plot', auth, getFilmPlot)
router.get("/search/:title", getFilmByTitle)



module.exports = router