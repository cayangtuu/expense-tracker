const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

require('./config/mongoose')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})