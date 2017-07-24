const User = require('../models/User')

function register(req, res) {
  // res.send(req.body)
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })
  // res.send(newUser)
  newUser.save(function(err, createdUser) {
    if (err) {
      return res.send(err)
    }
    res.redirect('/profile')
  })
}

function login(req, res) {
  // res.send(req.body)
  User.findOne({
    email: req.body.user.email
  }).exec(function(err, foundUser) {
    if (err) return res.send(err)
    const formPassword = req.body.user.password
    if (foundUser.validPassword(formPassword)) {
      res.send('valid, redirect to profile')
    } else {
      res.send('invalid,show flash message')
    }
    // res.send({
    //   reqbody: req.body,
    //   todo: `comparing ${formPassword} with ${foundUser.password}`
    // })
  })
  // const formPassword = req.body.user.password
  // res.send(`comparing ${formPassword} with hashedpassword`)
  // User.valid(formPassword)
}

module.exports = {
  register,
  login
}
