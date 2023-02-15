const express = require('express')
const router = express.Router()

router.get('/filter', (req, res) => {
  res.render('index', { categories, records })
})
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router