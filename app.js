var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon'); 
var logger = require('morgan'); //http request logger
var bodyParser = require('body-parser');

var homepage = require('./routes/homepage');

var app = express();

//view engine setup(handlebars)
app.set('views', path.join(__dirname, 'views'));
var exphbs = require('express3-handlebars').create({
    extname: '.hbs',
    defaultLayout: 'main'
});
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');

//test
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico',express.static('favicon.ico'));
app.use('/', homepage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //res.render('404');
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        //res.render('500');
        res.render('error', {message: err.message, error: err});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //res.render('500');
    res.render('error', {message: err.message, error: {}});
});

//app.listen(3000);
module.exports = app;
