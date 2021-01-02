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
  // addToWatchlist,
  getUserById,
  deleteFilm,
  clearUsers,
  rateFilm
} = Watchlist

router.route("/")
  .get(auth, getUsers)
  .delete(clearUsers)

router.route("/:id/watchlist")
  .get(auth, getUserById)
  .delete(deleteFilm)

router.route("/:id/rate")
.patch(validacija(addWatchSchema), rateFilm)
  
module.exports = router