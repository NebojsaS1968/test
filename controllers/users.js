const User = require("../models/user")
const Film = require("../models/film")

const getUsers = async (req, res, next) => {
  const user = await User.find({}).populate("watchlist")
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

module.exports = {
  getUsers,
  getUserById,
  deleteFilm,
  clearUsers
};