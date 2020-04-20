const express = require('express')
const router = express.Router()
const Login = require('../controllers/login')

const {
   login
} = Login

router.route('/').post(login)

module.exports = router