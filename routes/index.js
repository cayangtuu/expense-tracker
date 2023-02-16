const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const { generalErrorHandler } = require('../middleware/error')

router.use('/records', records)
router.use('/users', users)
router.use('/', home)
router.use('/', generalErrorHandler)

module.exports = router