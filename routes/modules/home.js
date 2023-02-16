const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')
const dayjs = require('dayjs')

router.get('/', async (req, res, next) => {
  try {
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

    // 計算總金額
    const amounts = reRecords.map(el => el.amount)
    const totalAmount = amounts.reduce((total, vl) => total + vl, 0)

    return res.render('index', { categories, reRecords, categoryId, totalAmount })
  }
  catch (err) {
    return next(err)
  }
})

module.exports = router