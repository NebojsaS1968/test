const express = require('express')
const router = express.Router()
const Registration = require('../controllers/registration')

const {
   reg
} = Registration

router.route('/').post(reg)

module.exports = router