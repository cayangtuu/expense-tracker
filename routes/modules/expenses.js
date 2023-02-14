const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})
router.get('/:id/edit', (req, res) => {
  res.render('edit')
})
router.put('/:id', (req, res) => {
  console.log('modify')
})
router.delete('/:id', (req, res) => {
  console.log('delete')
})
router.post('/', (req, res) => {
  console.log('add new data')
})
module.exports = router