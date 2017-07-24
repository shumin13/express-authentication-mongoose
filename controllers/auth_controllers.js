const User = require('../models/User')

function register (req, res) {
  // res.send(req.body)
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })
  // res.send(newUser)
  newUser.save(function(err, createdUser){
    if(err) {
      return res.send(err)
    }
    res.redirect('/profile')
  })
}

module.exports = {
  register
}
