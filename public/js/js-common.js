/**
 * Coder: fmd
 * Date: 2017/3/20
 * Time: 10:42
 */
;(function () {

})();
/**
 * Coder: fmd
 * Date: 2017/3/20
 * Time: 10:43
 */
;(function ($) {
    var Plugin = function (opt) {
        this.options = $.extend({
            a: 'xx'
        }, opt)
        this.init();
    };

    Plugin.prototype = {
        init: function () {
            console.log(this.options);
        }
    };

    window.Plugin = Plugin;
})(jQuery);