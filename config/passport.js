const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, cb) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return cb(null, false, req.flash('err_msg', `使用者尚未註冊!`))
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) { return cb(null, false, req.flash('err_msg', `帳號或密碼輸入錯誤!`)) }
              return cb(null, user)
            })
            .catch(err => cb(err, false))
        })
        .catch(err => cb(err, false))
    }))

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })
  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then(user => cb(null, user))
      .catch(err => cb(err, false))
  })
}