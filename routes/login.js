const express = require('express')
const router = express.Router()
const Login = require('../controllers/login')

const {
   findUser
} = Login

router.route('/').post(findUser)

module.exports = router