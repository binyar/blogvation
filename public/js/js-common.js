/**
 * Coder: fmd
 * Date: 2017/3/20
 * Time: 10:42
 */
;(function () {
    window.Utils = {

    }
})();
/**
 * Coder: fmd
 * Date: 2017/3/20
 * Time: 10:43
 */
;(function ($) {
    /**
     * 轮播控件
     * @param opt
     * @constructor
     */
    var Carousel = function (opt) {
        this.options = $.extend({
            a: 'xx'
        }, opt);
        this.init();
    };

    Carousel.prototype = {
        init: function () {
            console.log(this.options)
        }
    };

    window.Carousel = Carousel;
})(jQuery);