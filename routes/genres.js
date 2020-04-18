const express = require('express')
const router = express.Router()
const { validacija } = require("../middlewares/validation/validate")
const Genres = require('../controllers/genres')

const {
  addZanrSchema, 
  updateZanrSchema
} = require("../middlewares/validation/schemas/genres")

const {
  getAllGenres,
  getGenreById,
  getGenreByName,
  getFilmsByGenre,
  addGenre,
  addFilmToGenre,
  deleteAllGenres,
  deleteGenre,
  removeFilm
} = Genres

router.route('/').get(getAllGenres).post(validacija(addZanrSchema), addGenre).delete(deleteAllGenres)
router.route('/:id')
.get(getGenreById)
.patch(validacija(updateZanrSchema), addFilmToGenre)
.delete(deleteGenre)

router.route('/:id/movies').get(getFilmsByGenre)
router.route('/search/:name').get(getGenreByName)
router.route('/:id/remove').delete(removeFilm)

module.exports = router
