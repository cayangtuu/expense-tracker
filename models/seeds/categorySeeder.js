const db = require('../../config/mongoose')
const Category = require('../Category')
const categoryList = require('./category.json').results

db.once('open', () => {
  return Promise.all(Array.from(categoryList, category => {
    return Category.create(category)
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})