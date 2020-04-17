const express = require('express')
const router = express.Router()
const { validacija } = require("../middlewares/validation/validate")

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

router.route('/').get(getAllFilms).post(validacija(addFilmSchema), addFilm).delete(deleteAllFilms)
router.route('/:id')
.get(getFilmById)
.put(validacija(addFilmSchema), updateFilm)
.delete(deleteFilm)
.patch(validacija(updateFilmSchema), updateFilm)

router.get('/:id/plot', getFilmPlot)
router.get("/search/:title", getFilmByTitle)



module.exports = router