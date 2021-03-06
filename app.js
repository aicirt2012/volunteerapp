var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var compression = require('compression');
var domainMiddleware = require('express-domain-middleware');
var config = require('./config');


if(config.usemongo){
    var User = require('./server/model/mo/User');
    var setup = require('./server/routes/setup/mo.setup');
    var login = require('./server/routes/login/mo.login');
    var user = require('./server/routes/user/mo.user');
    var event = require('./server/routes/event/mo.event');
    var mydata = require('./server/routes/mydata/mo.mydata');
    var organization = require('./server/routes/organization/mo.organization');
    var dashboard = require('./server/routes/dashboard/mo.log');
    var migration = require('./server/routes/migration/mo.import');
}else{
    var User = require('./server/model/sc/User');
    var setup = require('./server/routes/setup/sc.setup');
    var login = require('./server/routes/login/sc.login');
    var user = require('./server/routes/user/sc.user');
    var event = require('./server/routes/event/sc.event');
    var mydata = require('./server/routes/mydata/sc.mydata');
    var organization = require('./server/routes/organization/sc.organization');
    var dashboard = require('./server/routes/dashboard/sc.dashboard');
    var migration = require('./server/routes/migration/sc.export');
}





var app = express().use(domainMiddleware);
if(config.usemongo) {
    mongoose.connect(config.database);
    mongoose.set('debug', true);
}



//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(compression());

if (app.get('env') === 'development') {
    app.use('/api/setup', setup);
    app.use('/api/migration', migration);
}

app.use('/api/login', login);


app.use('/api', function (req, res, next) {
    var auth = req.headers['authorization'];
    var token = null;
    if (auth)
        token = auth.split(" ")[1];

    if (token) {
        jwt.verify(token, config.jwt.secret, function (err, userid) {
            if (err) {
                console.error('JWT invalid');
                return res.status(403).send();
            } else {
                User.findById(userid, function (err, user) {
                    if (user && !err) {
                        req.user = user;
                        next();
                    } else {
                        console.error('JWT user not found in database!');
                        return res.status(403).send();
                    }
                });
            }
        });
    } else {
        console.error('No Token provides with request');
        return res.status(403).send();
    }
});


app.use('/api/user', user);
app.use('/api/mydata', mydata);
app.use('/api/event', event);
app.use('/api/organization', organization);
app.use('/api/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// partially adapted from https://github.com/brianc/node-domain-middleware
app.use(function (err, req, res, next) {
    var body;
    if (app.get('env') === 'development') {
        // development error handler
        // will print stacktrace
        body = {
            message: err.message,
            error: err.stack
        };
    } else {
        // production error handler
        // no stacktraces leaked to user
        body = {
            message: err.message,
            error: {}
        }
    }

    console.error('error on request %d %s %s', process.domain.id, req.method, req.url);
    console.error(err.stack);
    //console.error('request:', req);
    res.status(err.status || 500);
    res.json(body);

    if(err.domain) {
        //you should think about gracefully stopping & respawning your server
        //since an unhandled error might put your application into an unknown state
    }
});

process.on('uncaughtException', function (err) {
    console.error('uncaughtException', err.stack);

    // catching this event prevents from exiting the process,
    // which would be the normal reaction on an uncaught exception
    // check the discussion on
    // https://github.com/nodejs/node-v0.x-archive/issues/2582
    process.exit(1);
});

module.exports = app;
