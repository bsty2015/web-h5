var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connectRedis = require('connect-redis');
var bodyParser = require('body-parser');
var load = require('express-load');
var routes = require('./routes/routes');
var helpserFun = require('./common/ejsHelpers');
var flash = require('connect-flash');
//var csurf = require('csurf');
var app = express();
var uuid = require('node-uuid');
var interceptor = require('./common/interceptor');
var winston = require('winston');

app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('env', 'development');

app.use(logger('dev'));
app.use(cookieParser());

var RedisStore = connectRedis(session);
var options = {
    "host": "192.168.10.216",
    //"host": "172.16.3.222",
    "port": "6379",
    "ttl": 60 * 60 * 24 * 7, //Session的有效期为7天
};
app.use(session({
    store: new RedisStore(options),
    secret: 'jicai.com',
    name: 'jch5cid',
    cookie: {
        //domain: ".jicai.com",
        maxAge: 3600000 * 24 * 7
    },
    genid: function (req) {
        var token = req.cookies.token;
        var uid = '';
        if (token) {
            uid = new Date().getTime() + "JICAIH5" + token + uuid.v4();
        } else {
            uid = new Date().getTime() + "JICAIH5" + uuid.v4();
        }
        return uid;
    },
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(csurf());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

var logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: 'h5_log',
            dirname: '/var/logs/jc',
        })
    ]
});

var statisLogger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename: 'h5_statis',
            dirname: '/var/logs/jc',
        })
    ]
});

app.use(function (req, res, next) {
    if (!req.cookies.webFlag) {
        res.cookie('webFlag', uuid.v1());
    }
    next();
});

app.use(function (req, res, next) {
    res.locals.msg = '';
    res.locals.bottomMeu = 'home';
// req.app.locals.API_HOST = req.API_HOST = 'https://api.jicai.com';
    //req.app.locals.API_HOST = req.API_HOST = 'http://127.0.0.1:3001/japi';
      req.app.locals.API_HOST = req.API_HOST = 'http://api.jc.com';
    //req.app.locals.API_HOST = req.API_HOST = 'http://192.168.1.130:3001/japi';
    //req.app.locals.API_HOST =req.API_HOST = 'http://lh.jc.com:8089/';
    res.locals.appId = 'wx3bd2bac3905ddb8f';
    res.locals.assertHost = "https://jicaicdn.b0.upaiyun.com";//定义 CDN 静态文件 全局变量。<%=assertHost%>
    res.locals.assertHost = "";
    if (req.session.user && req.session.user.userKey) {
        res.locals.code = req.session.user.userKey;
        res.locals.userId = req.session.user.id;
    } else {
        res.locals.code = '';
        res.locals.userId = '';
    }
    res.locals.isCanShare = true;
    //res.locals.csurf = req.csrfToken();
    next();
});
interceptor(app);
helpserFun(app);
app.use(function (req, res, next) {
    var page = req.originalUrl;
    var userId = '';
    if (res.locals.userId) {
        userId = res.locals.userId;
    }
    var ip = req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
    var route = req.cookies.webFlag || '';
    statisLogger.info({
        'route': route,
        'userId': userId,
        source: res.locals.cs,
        ip: ip,
        page: page
    });
    next();
});

routes(app);


// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.render('other/500');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        if (err.code == 'EBADCSRFTOKEN') {

        } else {
            res.status(err.status || 500);
            console.log(err.stack);
            logger.error(err.stack);
            res.render('other/500', {
                message: err.message,
                error: err
            });
        }
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        if (err.code == 'EBADCSRFTOKEN') {

        } else {
            res.status(err.status || 500);
            res.render('other/500', {
                message: err.message,
                error: {}
            });
        }
    });
}
module.exports = app;