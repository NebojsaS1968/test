// R === REMOVED VALIDATION OR AUTH FOR TESTING REASONS (PUG || CHAI / MOCHA)

const express = require('express');
const router = express.Router();
const { validacija } = require("../middlewares/validation/validate");
const { auth } = require("../middlewares/validation/auth");

const {
    addFilmSchema,
    updateFilmSchema,
  } = require("../middlewares/validation/schemas/filmovi")
const Filmovi = require('../controllers/filmovi')

const {
   addForm,
   addFilm,

   getAllFilms,
   getFilmById,  

   updateForm,
   updateFilm,

   deleteFilm, 
   getFilmByTitle,
   deleteAllFilms 
  } = Filmovi

router.route('/')
.get(getAllFilms) // R
.delete(deleteAllFilms) // R

router.route('/add')
.get(addForm)
.post(validacija(addFilmSchema), addFilm)

router.route('/:id')
.get(getFilmById)
.delete(deleteFilm) // R
.patch([auth, validacija(updateFilmSchema)], updateFilm)

router.route('/edit/:id')
.get(updateForm)
.post(validacija(updateFilmSchema), updateFilm)

router.get("/search/:title", getFilmByTitle)


module.exports = router