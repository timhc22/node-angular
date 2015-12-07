var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    app = express();

// Database, can surround with environment stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Kitten = require('./models/kittens');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// this makes html the engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// view engine setup
//app.set('views', __dirname + '/views')
//app.set('view options', { layout:'layout.html' })
//app.set('view engine', 'html')
//app.engine('html', hbs.__express)
//app.use(express.static(__dirname + '/public'))
//expstate.extend(app)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // todo what is this
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



// database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    var silence = new Kitten({name: 'Silence'});
    silence.save(function (err, fluffy) {
        if (err) return console.error(err);
        console.log(silence.name); // 'Silence'
    });

    var fluffy = new Kitten({name: 'fluffy'});
    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });

    Kitten.find({name: /^Fluff/}, function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });
});






// todo should these error handlers be elsewhere?
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
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
});


// run app
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;