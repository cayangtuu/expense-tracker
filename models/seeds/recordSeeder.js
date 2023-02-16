const db = require('../../config/mongoose')
const Category = require('../Category')
const Record = require('../Record')
const User = require('../User')
const recordList = require('./record.json').results
const userList = require('./user.json').results

db.once('open', () => {
  return User.create(userList[0])
    .then(user => {
      return Promise.all(
        Array.from(recordList, async record => {
          record.userId = user._id
          const category = await Category.findOne({ name: record.category }).lean()
          record.categoryId = category._id
          await Record.create(record)
        }))
        .catch(err => console.log(err))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})