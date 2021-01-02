const User = require("../models/user")
const Film = require("../models/film")

const getUsers = async (req, res, next) => {
  const user = await User.find({}).populate("movie")
  res.status(200).send({ users: user })
}

const getUserById = async (req, res, next) => {
  const { id } = req.params
  const user = await User.findById(id).populate("watchlist")
  res.status(200).send({ user })
}

//DELETE FILM FROM WATCHLIST    
const deleteFilm = async (req, res, next) => {
  const { id } = req.params
  const film = req.body.film

  await User.updateOne({ _id: id }, { $pull: { watchlist: { $in: film } } })
  await Film.updateOne({ _id: film }, { $pull: { users: { $in: id } } })

  res.status(200).send({ msg: "Film is deleted" })
};

//CLEAR ALL USERS
const clearUsers = async (req, res, next) => {
  await User.deleteMany()
  res.status(200).send({ msg: "Empty users!"})
}

const rateFilm = async (req, res, next) => {
  const { movie } = req.body
  const { id } = req.params
  const { grade } = req.body

  const user = await User.findById(id)
  const film = await Film.findById(movie)
  
    if(user.movies.includes(movie) || film.users.includes(id)){
      const index = user.movies.findIndex((i) => i.id === movie)
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
  // addToWatchlist,
  getUserById,
  deleteFilm,
  clearUsers,
  rateFilm
};