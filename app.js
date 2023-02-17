const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const flash = require('connect-flash')

require('./config/mongoose')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.err_msg = req.flash('err_msg')
  res.locals.success_msg = req.flash('success_msg')
  next()
})

app.use(routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})