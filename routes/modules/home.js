const express = require('express')
const router = express.Router()

router.get('/filter', (req, res) => {
  res.render('index', { categories, expenses })
})
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router