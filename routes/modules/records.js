const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const dayjs = require('dayjs')

router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

router.get('/:id/edit', async (req, res) => {
  try {
    const _id = req.params.id
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id }).lean()

    record.date = dayjs(record.date).format('YYYY-MM-DD')
    const categoryId = record.categoryId
    res.render('edit', { record, categories, categoryId })
  }
  catch (err) {
    console.log(err)
  }
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { amount } = req.body
  if (amount < 0) {
    console.log('輸入金額需大於0')
    return res.redirect('back')
  }
  Record.findOne({ _id })
    .then(record => {
      for (let rec in req.body) {
        record[rec] = req.body[rec]
      }
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Record.findOne({ _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const { amount } = req.body
  if (amount < 0) {
    console.log('輸入金額需大於0')
    return res.redirect('back')
  }
  Record.create(req.body)
    .then(() => res.redirect('/'))
})
module.exports = router