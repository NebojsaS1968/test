const express = require('express')
const router = express.Router()
const Login = require('../controllers/login')
const { validacija } = require("../middlewares/validation/validate")

const {
   addUserSchema
 } = require("../middlewares/validation/schemas/users") 
 
const {
   // findUser
   getLoginForm,
   postLoginForm
} = Login

router.route('/')
.get(getLoginForm)
.post(postLoginForm)

// router.route('/').post(validacija(addUserSchema), findUser)

module.exports = router