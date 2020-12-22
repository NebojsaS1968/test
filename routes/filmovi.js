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
.get(getAllFilms) 
.delete(auth, deleteAllFilms) 

router.route('/add')
.get(auth, addForm)
.post([auth, validacija(addFilmSchema)], addFilm)

router.route('/:id')
.get(getFilmById)
.delete(auth, deleteFilm) 
.patch([auth, validacija(updateFilmSchema)], updateFilm)

router.route('/edit/:id')
.get(auth, updateForm)
.post([auth, validacija(updateFilmSchema)], updateFilm)

router.get("/search/:title", getFilmByTitle)


module.exports = router