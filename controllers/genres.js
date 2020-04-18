const Genre = require("../models/genre")
const Film = require("../models/film")

const getAllGenres = async (req, res, next) => {
    const genres = await Genre.find({})
    res.status(200).send({ genres: genres })
}

const getGenreById = async (req, res, next) =>{
  const { id } = req.params
  const genre = await Genre.findById(id).populate("movies")
  res.status(200).send({ genre })
}

const getGenreByName = async (req, res, next) => {
  const { name } = req.params
  const genre = await Genre.find().where("name").equals(new RegExp(name, "i"))
  if(genre.length === 0){
    res.status(200).send({ err: "Genre doesn't exist in the database!" })
  } else{
    res.status(200).send({genre})
  }
}

const getFilmsByGenre = async (req, res, next) => {
  const { id } = req.params
  const genre = await Genre.findById(id)
    const movies = {
      "Genre": genre.name,
      "Movies": genre.movies
    }
    res.status(200).send({movies})
}

const addGenre = async (req, res, next) => {
  const newGenre = {
      name: req.body.name,
      movies: req.body.movies
  }
  const genre = new Genre(newGenre)
  const saveGenre = await genre.save()
  res.status(201).send({ msg: "Genre has been saved", newGenre: saveGenre })
}

const deleteAllGenres = async (req, res, next) => {
  await Genre.deleteMany()
  res.status(200).send({msg: "Empty genres!"})
}

const addFilmToGenre = async (req, res, next) => {
  const { id } = req.params
  const { movies } = req.body

  const genre = await Genre.findById(id)
  const movie = await Film.findById(movies)
  //console.log(movies)

  if(movie.genres.includes(id)){
    res.status(200).send({ msg: "Movie already exists for this genre!" })
  } else if(movie){
    movie.genres.push(id)
    const save = await movie.save()

    genre.movies.push(movies)
    await genre.save()

    res.status(201).send({save})
  } else {res.status(200).send({ msg: "Wrong id!" })}
} 

const deleteGenre = async (req, res, next) =>{
  const { id } = req.params
  await Genre.findByIdAndDelete(id)
  res.status(200).send({ msg: "Genre is deleted" })
}

const removeFilm = async (req, res, next) =>{
  const { id } = req.params
  const film = req.body.film

  await Genre.updateOne({ _id: id }, { $pull: { movies: { $in: film } } })
  await Film.updateOne({ _id: film }, { $pull: { genres: { $in: id } } })

  res.status(200).send({ msg: "Films is deleted" })
}

module.exports = {
  getAllGenres,
  removeFilm,
  getGenreByName,
  getFilmsByGenre,
  addGenre,
  getGenreById,
  deleteAllGenres,
  addFilmToGenre,
  deleteGenre
}
