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
  const user = await User.findById(id).populate("movies")
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

module.exports = {
  getUsers,
  addUser,
  addToWatchlist,
  getUserById,
  deleteFilm,
  clearUsers,
};