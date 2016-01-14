/**
 * created by zhongciyisheng@live.com on 2015年9月18日 17:15:24
 * 观影季活动相关。
 */
var request = require('request');
var Base = require('./baseController');
var util = require('util');
var base = new Base();

function movieController() {
}
util.inherits(movieController, Base);

movieController.prototype.page_come_in = function (req, res, next) {
    res.locals.isCanShare = false;
    req.session.movie2_url = '/movieseason';
    var userId = req.session.userId;
    var user_info = {
        status: null, //状态
        userId: null, //用户ID
        inviteAmt: 0, // 邀请好友数量
        receivedGiftAmt: 0, //已获得的红包数。
        movieTickets: null, //红包码
        unUsedCodeAmt: 0, //红包总数
        isExistAuthGift: 0, //认证红包
        isExistUsefulGiftCode: 0, // 该值为1 就显示剩余红包总数， 该值为0 就显示0
        isExistRegistGift: 0 //是否存在注册红包，1表示存在，0表示不存在
    };

    base.postJson({
        url: req.API_HOST + '/api/movie/surplusAmt'
    }, function (result1) {
        if (result1.err_code == '0') {
            user_info.isExistUsefulGiftCode = result1.data.isExistUsefulGiftCode;
            user_info.isExistRegistGift = result1.data.isExistRegistGift;
            user_info.unUsedCodeAmt = result1.data.unUsedCodeAmt;
            if (userId) {
                user_info.userId = userId;
                base.postJson({
                    url: req.API_HOST + '/api/movie/deliver',
                    form: {
                        userId: userId
                    }
                }, function (result2) {
                    if (result2.err_code == '0') {
                        user_info.inviteAmt = result2.data.detail.inviteAmt;
                        user_info.isExistAuthGift = result2.data.detail.isExistAuthGift;
                        user_info.receivedGiftAmt = result2.data.detail.receivedGiftAmt;
                        user_info.status = result2.data.detail.status;
                        user_info.movieTickets = result2.data.movieTickets;
                        console.log('================================code:------' + user_info.code)
                        res.render('other/movie-2', user_info);
                    } else {
                        res.render('other/movie-2', user_info);
                    }
                    ;
                });
            } else {
                user_info.receivedGiftAmt = result1.data.unUsedCodeAmt;
                res.render('other/movie-2', user_info);
            }
            ;

        } else {
            res.render('other/movie-2', user_info);
        }
        ;
    });

};

movieController.prototype.status = function (req, res) {
    //	var prevUrl = req.headers['referer'];
    //	req.session.prevUrl = prevUrl;
    res.locals.isCanShare = false;
    var cs = res.locals.cs;
    req.session.cs = cs;
    var userId = req.session.userId; //获取userid。
    //  res.locals.bottomMeu = 'product';
    var emptyData = {
        isLogin: undefined, //判断是否登录。
        isInvest: false, //判断是否购买
        source: null,
        msg: req.flash('msg'),
        movie: {
            movie: []
        }
    };
    if (req.session.userId) {
        base.postJson({
            url: req.API_HOST + '/api/user/invest/isInvestCategory',
            form: {
                userId: userId
            }
        }, function (result) {
            var movie = result.data;
            var isInvest = '';
            var source = '';
            if (result.err_code == '0') {
                isInvest = result.data.isInvest; //判断是否购买。
                res.render('other/movie', {
                    isLogin: userId, //判断是否登录。
                    isInvest: isInvest, //判断是否购买
                    source: result.data.source, //用户来源
                    movie: movie
                });
            } else {
                emptyData.msg = '';
                res.render('other/movie', emptyData);
            }
        }, req);
    } else {
        res.render('other/movie', emptyData);
    }

};
/**
 * 观影季新用户入口
 */
movieController.prototype.moviereg = function (req, res) {
    var passwd = req.body.passwd; //密码
    var tel = req.body.telephone; //电话
    var cs = req.session.cs; //来源
    var validateCode = req.body.validateCode; //短信验证码
    var code = req.cookies.code || '';
    if (tel == null || req == undefined || tel.trim() == '' || validateCode == null || validateCode.trim() == '') {
        req.flash('msg', '请填写完整信息');
    } else {
        base.postJson({
            url: req.API_HOST + '/api/register',
            form: {
                telephone: tel,
                passwd: passwd,
                validateCode: validateCode,
                platform: 'h5',
                inviteCode: code,
                source: 'movie'
            }
        }, function (result) {
            if (result.err_code == '0') {
                req.session.regenerate(function () {
                    req.session.userId = result.data.user.id;
                    req.session.user = result.data.user;
                    req.session.accessToken = result.data.user.accessToken;
                    req.session.save(); //保存一下修改后的Session
                    req.flash('userId', req.session.userId);
                    if (cs == 'wp') {
                        res.redirect('/moviedownload');
                    } else {
                        res.redirect('/product/list');
                    }

                });
            } else {
                req.flash('msg', result.err_msg);
                req.flash('telephone', tel);
                req.flash('validateCode', validateCode);
                res.redirect('/movie');

            }
        });
    }

}

module.exports = movieController;