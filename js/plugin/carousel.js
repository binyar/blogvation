/**
 * Coder: fmd
 * Date: 2017/5/7
 * Time: 22:46
 */
// 这个分号的作用是防止和其他jquery插件合并时，别人不规范的jquery插件忘记使用分号结束
//影响到我们当前的插件，导致无法运行的问题。
;(function ($, window, document, undefined) {

    // undefined作为形参的目的是因为在es3中undefined是可以被修改的
    //比如我们可以声明var undefined = 123,这样就影响到了undefined值的判断，幸运的是在es5中,undefined不能被修改了。
    // window和document本身是全局变量，在这个地方作为形参的目的是因为js执行是从里到外查找变量的（作用域），把它们作为局部变量传进来，就避免了去外层查找，提高了效率。

    // 声明默认属性对象
    var pluginName = "carousel",
        defaults = {
            auto: false,
            gap: 3000,
            modal: 'default'
        };

    // 构造函数
    function Carousel(element, options) {
        this.element = element;
        // 将默认属性对象和传递的参数对象合并到第一个空对象中
        this.options = $.extend({}, defaults, options);
        this.init();
        this.bindEvent();
    }

    // 为了避免和原型对象Carousel.prototype的冲突，这地方采用继承原型对象的方法
    $.extend(Carousel.prototype, {
        init: function () {
            // 初始化，由于继承自Carousel原型，
            // 你可以在这里直接使用this.element或者this.options
            var o = this.options, self = this;
            this.$main = $('.dp-ui-carousel-main', this.element);
            this.$contents = $('.content-wrapper', this.$main);
            this.length = this.$contents.length;
            switch (o.modal) {
                case 'default':
                    this.index = 0;
                    this.$contents.each(function (i) {
                        $(this).css('left', i * 100 + '%')
                    });
                    //自动切换
                    if (o.auto) {
                        setInterval(function () {
                            self.switchDefaultWrapper('move')
                        }, o.gap)
                    }
                    break;
                case 'zoom':
                    this.index = this.$contents.index($('.current', this.$main));
                    break;
                default:
                    break;
            }
        },
        bindEvent: function () {
            var self = this, o = this.options;
            this.moving = false;
            $('.dp-ui-carousel-arrow')
                .on('click', function (e) {
                    switch (o.modal) {
                        case 'default':
                            if ($(e.currentTarget).hasClass('left')) {
                                self.switchDefaultWrapper('back');
                            } else if ($(e.currentTarget).hasClass('right')) {
                                self.switchDefaultWrapper('move');
                            }
                            break;
                        case 'zoom':
                            if (self.moving) {
                                e.preventDefault();
                                return false;
                            }
                            self.moving = true;
                            setTimeout(function () {
                                self.moving = false;
                            }, 500);
                            if ($(e.currentTarget).hasClass('left')) {
                                self.switchZoomWrapper('back');
                            } else if ($(e.currentTarget).hasClass('right')) {
                                self.switchZoomWrapper('move');
                            }
                            break;
                        default:
                            break;
                    }
                });
        },
        switchDefaultWrapper: function (action) {
            switch (action) {
                case 'move':
                    if (this.index === 0) {
                        this.index = this.length - 1;
                    } else {
                        this.index--;
                    }
                    break;
                case 'back':
                    if (this.index + 1 === this.length) {
                        this.index = 0;
                    } else {
                        this.index++;
                    }
                    break;
                default:
                    break;
            }
            this.$main.css({
                transform: 'translate(-' + this.index * 100 + '%,0)',
                '-webkit-transform': 'translate(-' + this.index * 100 + '%,0)',
                '-moz-transform': 'translate(-' + this.index * 100 + '%,0)',
                '-ms-transform': 'translate(-' + this.index * 100 + '%,0)',
                '-o-transform': 'translate(-' + this.index * 100 + '%,0)',
            })
        },
        switchZoomWrapper: function (action) {
            switch (action) {
                case 'move':
                    if (this.index === 0) {
                        this.index = this.length - 1;
                    } else {
                        this.index--;
                    }
                    $('.next', this.$main)
                        .removeClass('for-left')
                        .removeClass('next')
                        .addClass('for-right');
                    $('.current', this.$main)
                        .removeClass('for-left')
                        .addClass('for-right')
                        .removeClass('current')
                        .addClass('next');
                    $('.prev', this.$main)
                        .removeClass('for-left')
                        .addClass('for-right')
                        .removeClass('prev')
                        .addClass('current');
                    if (this.index === 0) {
                        this.$contents.eq(this.length - 1)
                            .removeClass('for-left')
                            .addClass('for-right')
                            .addClass('prev');
                    } else {
                        this.$contents.eq(this.index - 1)
                            .removeClass('for-left')
                            .addClass('for-right')
                            .addClass('prev');
                    }
                    break;
                case 'back':
                    if (this.index + 1 === this.length) {
                        this.index = 0;
                    } else {
                        this.index++;
                    }
                    $('.prev', this.$main)
                        .removeClass('for-right')
                        .removeClass('prev')
                        .addClass('for-left');
                    $('.current', this.$main)
                        .removeClass('for-right')
                        .addClass('for-left')
                        .removeClass('current')
                        .addClass('prev');
                    $('.next', this.$main)
                        .removeClass('for-right')
                        .addClass('for-left')
                        .removeClass('next')
                        .addClass('current');
                    if (this.index === this.length - 1) {
                        this.$contents.eq(0)
                            .removeClass('for-right')
                            .addClass('for-left')
                            .addClass('next');
                    } else {
                        this.$contents.eq(this.index + 1)
                            .removeClass('for-right')
                            .addClass('for-left')
                            .addClass('next');
                    }
                    break;
                default:
                    break;
            }
        }
    });

    // 对构造函数的一个轻量级封装，
    // 防止产生多个实例
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Carousel(this, options));
            }
        });
        // 方便链式调用
        return this;
    };

})(jQuery, window, document);