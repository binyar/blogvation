/**
 * Coder: fmd
 * Date: 2017/5/11
 * Time: 11:55
 */
;(function ($, window, document, undefined) {
    var pluginName = "banding",
        defaults = {
            perPage: 4
        };

    // 构造函数
    function Banding(element, options) {
        this.element = element;
        // 将默认属性对象和传递的参数对象合并到第一个空对象中
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    // 为了避免和原型对象Carousel.prototype的冲突，这地方采用继承原型对象的方法
    $.extend(Banding.prototype, {
        init: function () {
            // 初始化，由于继承自Carousel原型，
            // 你可以在这里直接使用this.element或者this.options
            var self = this;
            var width = 100 / this.options.perPage;
            var itemWidth = width * 0.01 * $(self.element).outerWidth(true);
            var $items = $('.banding-item-wrapper', this.element)
            $items.each(function (index) {
                $(this).css({
                    left: index * width + '%',
                    width: itemWidth
                })
            });
            this.index = this.options.perPage;
            this.length = $items.length;
            this.action = 'next';
            var perPage = this.options.perPage;
            setInterval(function () {
                if (self.index === self.length) {
                    self.action = 'prev';
                } else if (self.index === self.options.perPage) {
                    self.action = 'next'
                }
                if (self.action === 'next') {
                    self.index++;
                } else {
                    self.index--;
                }
                $(self.element).css({
                    transform: 'translate(-' + (self.index - perPage) * width + '%,0)',
                    '-webkit-transform': 'translate(-' + (self.index - perPage) * width + '%,0)',
                    '-moz-transform': 'translate(-' + (self.index - perPage) * width + '%,0)',
                    '-ms-transform': 'translate(-' + (self.index - perPage) * width + '%,0)',
                    '-o-transform': 'translate(-' + (self.index - perPage) * width + '%,0)',
                })
            }, 3000)
        }
    });

    // 对构造函数的一个轻量级封装，
    // 防止产生多个实例
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Banding(this, options));
            }
        });
        // 方便链式调用
        return this;
    };

})(jQuery, window, document);