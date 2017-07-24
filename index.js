var express = require('express');
const exphbs = require('express-handlebars')
// var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();

if (process.env.NODE_ENV === "test") {
  mongoose.connect('mongodb://localhost/express-authentication')
} else {
  mongoose.connect('mongodb://localhost/express-authentication-test')
}

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')


app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', function(req, res) {
  res.render('profile');
});

const authRoutes = require('./routes/auth_routes')
app.use('/', authRoutes)

const port = process.env.PORT || 3000
var server = app.listen(port, function() {
  console.log('express is running on port ' + port)
})

module.exports = server;
