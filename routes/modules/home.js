const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const dayjs = require('dayjs')

router.get('/', async (req, res) => {
  const categoryId = req.query.categoryId
  const categories = await Category.find().lean()
  const records = await Record.find().lean()

  // 轉換日期與新增圖示icon
  let reRecords = records.map(record => {
    record.date = dayjs(record.date).format('YYYY/MM/DD')
    const category = categories.find(cat => record.categoryId.toString() === cat._id.toString())
    record.icon = category.icon
    return record
  })

  // 若使用者選擇特定類別
  if (categoryId) {
    reRecords = reRecords.filter(record => record.categoryId.toString() === categoryId.toString())
  }

  res.render('index', { categories, reRecords, categoryId })
})

module.exports = router