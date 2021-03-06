const express = require("express");
const router = express.Router();
const { auth } = require('../middlewares/validation/auth')
const Watchlist = require("../controllers/users");
const { validacija } = require("../middlewares/validation/validate");
const {
  addUserSchema,
  addWatchSchema,
} = require("../middlewares/validation/schemas/users");

const {
  getUsers,
  getUserById,
  deleteFilm,
  clearUsers
} = Watchlist

router.route("/")
  .get(auth, getUsers)
  .delete(clearUsers)

router.route("/:id/watchlist")
  .get(auth, getUserById)
  .delete(deleteFilm)
  
module.exports = router