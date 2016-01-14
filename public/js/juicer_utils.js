define(function (require, exports, module) {
//		require('jquery');
    require("juicer");
    require("numeral");
    function formatNumber(val) {
        if (val == undefined || val == 'null') {
            return 0;
        }
        return numeral(val).format("0,0[.]00");
    }

    function formatDate(val, format) {
        if (format) {
            return new Date(val).pattern("yyyy-MM-dd", format);
        }
        return new Date(val).pattern("yyyy-MM-dd");
    }


    function formatYMDHMS(val) {
        return new Date(val).pattern('yyyy-MM-dd HH:mm:ss');
    };
    juicer.register('formatNumber', formatNumber);
    juicer.register('formatDate', formatDate);
    juicer.register('formatYMDHMS', formatYMDHMS);
});