const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/User')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }))

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  if (!email || !password || !confirmPassword) throw new Error(`帳號與密碼為必填!`)
  if (password !== confirmPassword) throw new Error(`密碼並不相符!`)
  User.findOne({ email })
    .then(user => {
      if (user) throw new Error(`使用者已存在，請登入!`)
      return bcrypt
        .genSalt(12)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name, email, password: hash
        }))
    })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', `登出成功!`)
  return res.redirect('/users/login')
})
module.exports = router