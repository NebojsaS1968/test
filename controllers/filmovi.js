const Film = require("../models/film")

const sortFilmove = (a, b, value) => {
  if (a[value] < b[value]) {
    return -1
  }
  if (a[value] > b[value]) {
    return 1
  }
  return 0
}

const getAllFilms = async (req, res, next) => {
  //CASE 1
  if(req.query.sort === "godina" && req.query.order === "asc"){
    const film = await Film.find({})
    const filmovi = film.sort((a, b) => sortFilmove(a, b, "year"))
    res.status(200).send({ filmovi })
  }

  //CASE 2
  if(req.query.sort === "godina" && req.query.order === "desc"){
    const film = await Film.find({})
    const filmovi = film.sort((a, b) => sortFilmove(a, b, "year")).reverse()
    res.status(200).send({ filmovi })
  }

  //CASE 3
  if(req.query.sort === "ocena" && req.query.order === "desc"){
    const film = await Film.find({})
    const filmovi = film.sort((a, b) => sortFilmove(a, b, "rating"))
    res.status(200).send({ filmovi })
  }

  //CASE 4
  if(req.query.sort === "ocena" && req.query.order === "asc"){
    const film = await Film.find({})
    const filmovi = film.sort((a, b) => sortFilmove(a, b, "rating")).reverse()
    res.status(200).send({ filmovi })
  }

  //CASE 5
  if (!req.query.sort && !req.query.order) {
    if (req.query.limit){
      const filmovi = await Film.find({}).limit(parseInt(req.query.limit))
      return res.status(200).send(filmovi)
   }
    const Filmovi = await Film.find({})
    res.status(200)
    res.send({ filmovi: Filmovi })
  }
}

const getFilmById = async (req, res, next) => {
  const { id } = req.params
  const film = await Film.findById(id).populate("actors")
  res.status(200).send({ film })
}

const getFilmByTitle = async (req, res, next) => {
  const { title } = req.params
  const movie = await Film.find().where("title").equals(new RegExp(title, "i"))
  if (movie.length === 0) {
    res.status(200).send({ err: "No such movie in the database!" })
  } else {
    res.status(200).send({ movie })
  }
}

const getFilmPlot = async (req, res, next) => {
  const { id } = req.params
  const film = await Film.findById(id)
    const opis = {
      "Film": film.title,
      "Opis": film.plot
    }
    res.status(200).send({ opis })
  }



const addFilm = async (req, res, next) => {
  console.log(req.body)
  const newFilm = {
    title:  req.body.title,
    year: req.body.year,
    genres: req.body.genres,
    director: req.body.director,
    plot: req.body.plot,
    rating: req.body.rating,
    actors: req.body.actors,
    runtime: req.body.runtime
  }
  const movie = new Film(newFilm)
  const saveMovie = await movie.save()
  res.status(201).json({ msg: "Film is saved", newFilm: saveMovie })
}


const deleteFilm = async (req, res, next) =>{
  const { id } = req.params
  await Film.findByIdAndDelete(id)
  res.status(200).send({ msg: "Film is deleted" })
}

const updateFilm = async (req, res, next) =>{
  const { id } = req.params
  const update = req.body
  await Film.findByIdAndUpdate(id, update)
  res.status(200).send({ msg: "Film is updated" })
}

module.exports = {
   getAllFilms,
   getFilmById, 
   getFilmPlot, 
   addFilm, 
   deleteFilm, 
   updateFilm,
   getFilmByTitle
  }
