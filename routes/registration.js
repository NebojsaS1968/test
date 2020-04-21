const express = require('express')
const router = express.Router()
const Registration = require('../controllers/registration')

const {
   regUser
} = Registration

router.route('/').post(regUser)

module.exports = router