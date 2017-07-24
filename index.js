require('dotenv').config()

var express = require('express');
const exphbs = require('express-handlebars')
// var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

var app = express()

app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost/express-authentication'
  }),
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}))


// initialize passport
const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV === "test") {
  mongoose.connect('mongodb://localhost/express-authentication-test')
} else {
  mongoose.connect('mongodb://localhost/express-authentication')
}

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')


app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  if(req.user){
    res.send('hide login page')
  // res.render('index');
}})

app.get('/profile', function(req, res) {
  res.render('profile');
})

const authRoutes = require('./routes/auth_routes')
app.use('/', authRoutes)

const port = process.env.PORT || 3000
var server = app.listen(port, function() {
  console.log('express is running on port ' + port)
})

module.exports = server;
