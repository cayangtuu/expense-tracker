const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const dayjs = require('dayjs')

router.get('/new', (req, res, next) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => next(err))
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).lean()

    record.date = dayjs(record.date).format('YYYY-MM-DD')
    const categoryId = record.categoryId
    return res.render('edit', { record, categories, categoryId })
  }
  catch (err) {
    return next(err)
  }
})

router.put('/:id', (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, categoryId } = req.body

  if (!name || !date || !categoryId || !amount) throw new Error(`請確認欄位皆為必填!`)
  if (amount < 0) throw new Error(`輸入金額需大於0!`)

  return Record.findOne({ _id, userId })
    .then(record => {
      for (let rec in req.body) {
        record[rec] = req.body[rec]
      }
      return record.save()
    })
    .then(() => {
      req.flash('success_msg', `帳目修改成功!`)
      return res.redirect('/')
    })
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      if (!record) throw new Error(`資料不存在!`)
      record.remove()
    })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const userId = req.user._id
  const { name, date, amount, categoryId } = req.body

  if (!name || !date || !categoryId || !amount) throw new Error(`請確認欄位皆為必填`)
  if (amount < 0) throw new Error(`輸入金額需大於0`)

  return Record.create({ ...req.body, userId })
    .then(() => {
      req.flash('success_msg', `帳目新增成功!`)
      return res.redirect('/')
    })
    .catch(err => next(err))
})
module.exports = router