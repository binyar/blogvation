/**
 * Coder: fmd
 * Date: 2017/5/11
 * Time: 11:55
 */
;(function ($, window, document, undefined) {
    var pluginName = "waterfall",
        defaults = {
            cols: 3
        };

    // 构造函数
    function WaterFall(element, options) {
        this.element = element;
        // 将默认属性对象和传递的参数对象合并到第一个空对象中
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    // 为了避免和原型对象Carousel.prototype的冲突，这地方采用继承原型对象的方法
    $.extend(WaterFall.prototype, {
        init: function () {
            // 初始化，由于继承自Carousel原型，
            // 你可以在这里直接使用this.element或者this.options
            var self = this;
            var cols = this.options.cols;
            var gap = this.options.gap;
            var $items = $('.waterfall-item-wrapper', this.element);
            this.imageMap = {};
            var width = 100 / cols;
            var maxHeight = 0;
            $items.each(function (index) {
                var height = $('.item-image', this).height() / cols;
                index++;
                var row = parseInt((index) / cols, 10);
                var top = 0;
                if ((index) % cols !== 0) {
                    row++;
                } else {
                    for (var i = 0; i < cols; i++) {
                        var arr = [];
                        if (i !== 0) {
                            arr.push(self.imageMap[index - i].height)
                        } else {
                            arr.push(height)
                        }
                    }
                    maxHeight += self.getMax(arr);
                }
                //非第一行
                if (row !== 1) {
                    var parent = self.imageMap[index - cols];
                    top = parent.top + parent.height;
                }
                self.imageMap[index] = {
                    height: height,
                    top: top
                };
                var left = (index - 1) % cols * width;
                $(this).css({
                    width: width + '%',
                    left: left + '%',
                    top: top,
                    height: height
                });

            });
            $(this.element).height(maxHeight);
        },
        getMax: function (arr) {
            var max = 0;
            arr.map(function (num) {
                if (max <= num) {
                    max = num;
                }
            });
            return max;
        }
    });

    // 对构造函数的一个轻量级封装，
    // 防止产生多个实例
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new WaterFall(this, options));
            }
        });
        // 方便链式调用
        return this;
    };

})(jQuery, window, document);