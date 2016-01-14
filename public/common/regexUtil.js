/**
 * Created by lrh on 16/6/15.
 */
define(function (require, exports, module) {

    var TELEPHONE_REGEX = /^\d{11}$/;//匹配移动电话号码

    var regex = {

        match: function (val, regex) {
            if (regex == null || regex == undefined) {
                return false;
            }
            return regex.test(val);
        },
        verifyTelephone: function (val) {
            return this.match(val, TELEPHONE_REGEX);
        }
    };
    module.exports = regex;
});