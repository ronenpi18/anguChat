var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var passport = require('passport');
var path = require('path');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(methodOverride());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/app', express.static('./app'));
app.use('/bower_components', express.static('./bower_components'));


//models
var data = require('./data');

//sockets
var sockets = require('./sockets')(http);

// Routes
app.use(require('./routes/api'));
app.use(require('./routes/public'));

function start(){
  http.listen(4000, function(){
    console.log('listening on *:4000');
  });
}

exports.start = start;
