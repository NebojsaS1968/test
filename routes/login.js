const express = require('express')
const router = express.Router()
const Login = require('../controllers/login')
const { validacija } = require("../middlewares/validation/validate")

const {
   addUserSchema
 } = require("../middlewares/validation/schemas/users") 
 

const {
   findUser
} = Login

router.route('/').post(validacija(addUserSchema), findUser)

module.exports = router