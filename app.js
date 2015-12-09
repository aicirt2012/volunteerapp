var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var setup = require('./server/routes/setup/setup');
var init = require('./server/routes/init/init');
var login = require('./server/routes/login/login');
var user = require('./server/routes/user/user');
var event = require('./server/routes/event/event');

var app = express();


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/api/setup', setup);
app.use('/api/init', init);
app.use('/api/login', login);

/*
app.use('/api',function (req, res, next) {
    var auth = req.headers['authorization'];
    var token = null;
    if (auth)
        token = auth.split(" ")[1];
    if (token) {
        jwt.verify(token, config.secret, function (err, userid) {
            if (err) {
                return res.status(403).send();
            } else {
                User.findById(userid, function (err, user) {
                    if(user && user.isactive) {
                        req.user = user;
                        next();
                    } else
                        return res.status(403).send();
                });
            }
        });
    } else
        return res.status(403).send();
});
*/

app.use('/api/user', user);
app.use('/api/event', event);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
