var routeMap = [];

var index = require('./index');
routeMap.push(index);

var users = require('./users');
routeMap.push(users);

var pay = require('./pay');
routeMap.push(pay);

var product = require('./product');
routeMap.push(product);

var message = require('./message');
routeMap.push(message);

var bank = require('./bank');
routeMap.push(bank);

var about = require('./about');
routeMap.push(about);


var register = require('./register');
routeMap.push(register);

var forget = require('./forget');
routeMap.push(forget);

var login = require('./login');
routeMap.push(login);

var userAgreement = require('./userAgree');
routeMap.push(userAgreement);

var invite = require('./invite');
routeMap.push(invite);

var wechat = require('./wechat');
routeMap.push(wechat);

var aboutUs = require('./aboutUs');
routeMap.push(aboutUs);

var otherSafety = require('./otherSafety');
routeMap.push(otherSafety);

var otherPlan = require('./otherPlan');
routeMap.push(otherPlan);

var othersever = require('./sever');
routeMap.push(othersever);

var aboutForUs = require('./aboutForUs');
routeMap.push(aboutForUs);

//var cash = require('./cash');
//routeMap.push(cash);

var regSuccess = require('./regSuccess');
routeMap.push(regSuccess);

var fqa = require('./fqa');
routeMap.push(fqa);

var activity = require('./activity');
routeMap.push(activity);

var invitation = require('./invitation');
routeMap.push(invitation);

var comment = require('./comment');
routeMap.push(comment);

var check = require('./check');
routeMap.push(check);

var thunderRegister = require('./thunderRegister');
routeMap.push(thunderRegister);

var thunderVerify = require('./thunderVerify');
routeMap.push(thunderVerify);

var sign = require('./sign');
routeMap.push(sign);

var movieDownload = require("./movieDownload");
routeMap.push(movieDownload);

var join = require("./join");
routeMap.push(join);

//var wechat_Dec_activity=require("./wechat_Dec_activity");
//routeMap.push(wechat_Dec_activity);
/*
 * 1元体验金活动
 */
var virtualGifts = require('./virtualGifts');
routeMap.push(virtualGifts);
/**
 * =====    引导    认证身份证    =====
 */
var guide = require('./guide');
routeMap.push(guide);
/**
 * 中秋节活动
 */
var midAutumnFestival = require('./midAutumnFestival');
routeMap.push(midAutumnFestival);

var movie = require('./movie');
routeMap.push(movie);

var downloadAndroid = require('./downloadAndroid');
routeMap.push(downloadAndroid);

var regPage = require('./regPage');
routeMap.push(regPage);


var regsuc = require('./regsuc');
routeMap.push(regsuc);

var movie2 = require('./movie-2');
routeMap.push(movie2);

var wechat_dec_activity = require('./wechat_dec_activity');
routeMap.push(wechat_dec_activity);


module.exports = function (app) {
    routeMap.forEach(function (item) {
        app.use('/', item);
    })
};