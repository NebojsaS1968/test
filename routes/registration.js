const express = require('express')
const router = express.Router()
const Registration = require('../controllers/registration')
const { validacija } = require("../middlewares/validation/validate")

const {
   addUserSchema
 } = require("../middlewares/validation/schemas/users")

const {
   registerValid
} = require('../middlewares/validation/register')

const {
   regUser,
   getRegForm
} = Registration

router.route('/')
.get(getRegForm)
.post(validacija(addUserSchema), registerValid, regUser)

module.exports = router