const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})