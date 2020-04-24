const User = require("../models/user")
const Film = require("../models/film")

const getUsers = async (req, res, next) => {
  const user = await User.find({})
  res.status(200).send({ user })
}

const addUser = async (req, res, next) => {
  const newUser = { name: req.body.name }
  const user = new User(newUser)
  const save = await user.save()
  res.status(201).send(save)
}

const addToWatchlist = async (req, res, next) => {
  const { id } = req.params
  const { movies } = req.body

  const user = await User.findById(id)
  const movie = await Film.findById(movies)
  console.log(movie)
  if (user.movies.includes(movies) || movie.users.includes(id)) {
    res.status(200).send({ msg: "Movie already exists in this user watchlist!" })
  } else if (movie) {
    movie.users.push(id)
    const save = await movie.save()

    user.movies.push(movies)
    await user.save()
    res.status(201).send(save)
  } else res.status(200).send({ error: "Wrong id!" })
}

const getUserById = async (req, res, next) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.status(200).send({ user })
}

const deleteFilm = async (req, res, next) => {
  const { id } = req.params
  const film = req.body.film

  await User.updateOne({ _id: id }, { $pull: { movies: { $in: film } } })
  await Film.updateOne({ _id: film }, { $pull: { users: { $in: id } } })

  res.status(200).send({ msg: "Film is deleted" })
};

const clearUsers = async (req, res, next) => {
  await User.deleteMany()
  res.status(200).send({ msg: "Empty users!"})
};

const rateFilm = async (req, res, next) => {
  const { movie } = req.body
  const { id } = req.params
  const { grade } = req.body

  const user = await User.findById(id)
  const film = await Film.findById(movie)
  
    if(user.movies.includes(movie) || film.users.includes(id)){
      const index = user.movies.findIndex(i => i.id === movie)
      user.movies[index].grade = grade
      const save = await user.save()
      return res.status(201).send(save)
    }
    
  if(!user){
    return res.status(400).send({ err: "Wrong id of the user!" })
  }
  if(!film){
    return res.status(400).send({ err: "Wrong id of the film!" })
  }
}

module.exports = {
  getUsers,
  addUser,
  addToWatchlist,
  getUserById,
  deleteFilm,
  clearUsers,
  rateFilm
};