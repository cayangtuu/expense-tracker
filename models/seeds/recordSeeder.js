const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Category = require('../Category')
const Record = require('../Record')
const User = require('../User')
const recordList = require('./record.json').results
const userList = require('./user.json').results

db.once('open', () => {
  userList.map(user => {
    return bcrypt
      .genSalt(12)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        user: user.name,
        email: user.email,
        password: hash
      }))
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
})