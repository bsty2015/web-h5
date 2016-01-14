/**
 * Created by lrh on 13/8/15.
 */

function Interceptor(app) {
    app.use(dealActivity);
}

function dealActivity(req, res, next) {
    var path = req.path;
    var cs = '';
    if (req.cookies.cs && req.cookies.cs != '') {
        cs = req.cookies.cs;
    }
    ;
    if (req.query.cs && req.query.cs != '') {
        cs = req.query.cs;
    }
    ;
    res.locals.cs = cs;
    res.cookie('cs', cs);

    if (req.query.code) {
        res.cookie('code', req.query.code, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true
        });
    }
    ;
    next();
}
module.exports = Interceptor;