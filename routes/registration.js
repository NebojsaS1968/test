const express = require('express')
const router = express.Router()
const Registration = require('../controllers/registration')
const { validacija } = require("../middlewares/validation/validate")

const {
   addUserSchema
 } = require("../middlewares/validation/schemas/users")

const {
   regUser
} = Registration

router.route('/').post(validacija(addUserSchema), regUser)

module.exports = router