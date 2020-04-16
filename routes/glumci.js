const express = require('express')
const router = express.Router()
const { validacija } = require("../middlewares/validation/validate")
const Glumci = require('../controllers/glumci')

const {
  addActorSchema, 
  updateActorSchema
} = require("../middlewares/validation/schemas/glumci")

const {
  getAllActors,
  getActorById,
  getActorByName,
  getAwards,
  getActorFilms,
  addActor,
  updateActor,
  deleteActor
} = Glumci

router.route('/').get(getAllActors).post(validacija(addActorSchema), addActor)
router.route('/:id')
.get(getActorById)
.patch(validacija(updateActorSchema), updateActor)
.delete(deleteActor)
 
router.route('/:id/awards').get(getAwards) 
router.route('/:id/movies').get(getActorFilms)
router.route('/search/:name').get(getActorByName)

module.exports = router
