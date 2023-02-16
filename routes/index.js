const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const { generalErrorHandler } = require('../middlewares/error')

router.use('/records', records)
router.use('/', home)
router.use('/', generalErrorHandler)

module.exports = router