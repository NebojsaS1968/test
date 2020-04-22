const express = require("express");
const router = express.Router();

const Watchlist = require("../controllers/users");
const { validacija } = require("../middlewares/validation/validate");
const {
  addUserSchema,
  addWatchSchema,
} = require("../middlewares/validation/schemas/users");

const {
  getUsers,
  addToWatchlist,
  addUser,
  getUserById,
  deleteFilm,
  clearUsers,
  rateFilm
} = Watchlist

router
  .route("/")
  .get(getUsers)
  .post(validacija(addUserSchema), addUser)
  .delete(clearUsers)
router
  .route("/:id")
  .patch(validacija(addWatchSchema), addToWatchlist)
  .get(getUserById)
  .delete(deleteFilm)

router.route("/:id/rate")
.patch(validacija(addWatchSchema), rateFilm)
  
module.exports = router