const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.ACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/fbcallback"
  },
    fbVerify
  )
)

function fbVerify (accessToken, refreshToken, profile, next) {
  console.log(profile);
  User.findOrCreate({
    facebookId: profile.id
  }, function(err, user) {
    return next(err, user)
  })
}

passport.use(
  new LocalStrategy({
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    localVerify
  )
)

function localVerify(req, email, password, next) {
  User.findOne({
    email: email
  }).exec(function(err, foundUser) {
    if (err) return next(err)
    const formPassword = password
    if (foundUser.validPassword(formPassword)) {
      next(null, foundUser)
    }
  })
}

module.exports = passport
