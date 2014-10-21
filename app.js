var fs  = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var config = require('./config/config');
var mongoose = require("mongoose");

var multer  = require('multer');

var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer({ 
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    },
    onFileUploadStart: function (file) {
        console.log(file.fieldname + ' is starting ...')
    },
    onFileUploadData: function (file, data) {
        console.log(data.length + ' of ' + file.fieldname + ' arrived')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));



app.set('views', path.join(__dirname, 'app/views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../myuploads')));
app.use(express.static(path.join(__dirname, '../hello')));

//app.use(express.static(path.join(__dirname, 'public/jquery')));
//app.use(express.static(path.join(__dirname, 'public/bootstrap-3.2.0-dist/css')));
app.use(cookieParser()); // read cookies (needed for auth)
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ 
	secret: 'keepthisstringsecret',
	resave: true,
	saveUninitialized: false
	})
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




var connect = function(){
   var options = {
      server: {
         socketOptions:{
            keepAlive : 1
         }
      }
   };
   mongoose.connect(config.db,options);
};
connect();

mongoose.connection.on('error',console.log);
mongoose.connection.on('disconnected',connect);

//bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
   if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});
require('./config/passport')(passport);

require('./config/routes')(app);
require('./config/express')(app);
//app.listen(port);
//console.log('Express app started on port ' + port);


module.exports = app;
