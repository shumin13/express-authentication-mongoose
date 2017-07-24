var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth_controllers')
const passport = require('../config/passport')

router.get('/register', function (req, res) {
  res.render('auth/signup')
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/register', authController.register)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/register'
}))

router.get('/fblogin', passport.authenticate('facebook'))
router.get('/fbcallback',
  passport.authenticate('facebook',
  {
    failureRedirect: '/register'
  }),
function(req, res) {
  res.send(req.user)
  // res.redirect('/')
})

// router.post('/login', authController.login)

module.exports = router
