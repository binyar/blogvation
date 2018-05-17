/**
 * Coder: fmd
 * Date: 2018/5/5
 * Time: 23:06
 */
;(function ($, window, document, undefined) {
    var pluginName = 'dpPage', defaults = {
        bindEvent: true
    };

    function DpPage(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this.progress = 0;
        this.shouldLoad = false;
        this.init();
    }

    $.extend(DpPage.prototype, {
        init: function () {
            this.element.children('.load-icon').addClass('active');
            this.doProgress();
            this.bindLink();
            this.bindMenu();
            this.bindScroll();
        },
        doProgress: function () {
            var randomTime = this.getRandomProgress();
            var self = this;
            setTimeout(function () {
                if (self.progress < 100) {
                    self.setProgressText();
                    var step = parseInt(100 * (randomTime / 1000), 10);
                    self.progress += step;
                    self.doProgress();
                    return;
                }
                self.shouldLoad && self.load();
            }, randomTime)
        },
        getRandomProgress: function () {
            return parseInt(Math.random() * 100, 10);
        },
        setProgressText: function (active) {
            var $icon = $('.load-icon', this.element);
            $('.icon-text', $icon).text(this.progress + '%');
            $('.progress', $icon).css('width', this.progress + '%');
            active && $('.load-mask', this.element).addClass('active');
        },
        onload: function () {
            this.shouldLoad = true;
            this.load();
        },
        load: function () {
            if (this.progress < 80) {
                return;
            }
            this.progress = 100;
            this.setProgressText(true);
            var self = this;
            setTimeout(function () {
                self.element.animate({
                    opacity: 0
                }, 200, function () {
                    self.element.remove();
                    $('body').removeClass('hidden');
                    var $header = $('.dp-activation-page >.dp-activation-page-home >.home-header');
                    var $main = $('.dp-activation-page >.dp-activation-page-home >.home-main-body');
                    if ($header.length) {
                        $header.addClass('fadeIn');
                    }
                    if ($main.length) {
                        $main.addClass('fadeIn');
                    }
                    self.options.back && self.options.back();
                })
            }, 1000)
        },
        bindLink: function () {
            $('a[href$=".html"]').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('body').css('background', '#fff');
                $('body').animate({
                    scrollTop: 0,
                    background: '#fff',
                    opacity: 0
                }, 800, function () {
                    $('body').addClass('hidden');
                    setTimeout(function () {
                        window.location.href = $(e.currentTarget).attr('href')
                    }, 200)
                });
                return false;
            });
        },

        bindMenu: function () {
            $('#item-menu').on('click', function () {
                $('body').css('overflow', 'hidden');
                $('#menu-mask').show()
                    .animate({
                        opacity: 1
                    }, 400);
            });
            $('#menu-close').on('click', function () {
                $('#menu-mask').animate({
                    opacity: 0
                }, 400, function () {
                    $('#menu-mask').hide();
                    $('body').css('overflow', 'auto');
                })
            })
        },
        bindScroll: function () {
            var wheight = $(window).height() * 0.75;
            $(window).scroll(function () {
                doScroll();
            });

            function doScroll() {
                var top = $(window).scrollTop();
                $('.home-section-loader.not-load').each(function () {
                    if (top + wheight > $(this).offset().top - 100) {
                        $(this).removeClass('not-load');
                    }
                })
            }

            doScroll();
        }
    });
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new DpPage(this, options))
            }
        })
    }
})(jQuery, window, document);

;(function ($, window, document, undefined) {
    var pluginName = 'dpCarousel', defaults = {
        time: 4000,
        index: 0,
        target: '/home'
    };

    function DpCarousel(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        var $main = $('.page-main', this.element);
        this.$menus = $('.header-menu-item', $main);
        this.$bgs = $('.init-bg', this.element);
        this.$contents = $('.init-content', $main);
        this.init();
    }

    $.extend(DpCarousel.prototype, {
        init: function () {
            var o = this.options, self = this;
            if (o.index === this.$menus.length) {
                $('body').css('background', '#fff');
                $('body').animate({
                    background: '#fff',
                    opacity: 0
                }, 800, function () {
                    setTimeout(function () {
                        window.location.href = o.target;
                    }, 200)
                });
                return;
            }
            this.$menus.eq(o.index).addClass('active').siblings().removeClass('active');
            this.$bgs.eq(o.index).addClass('fadeIn').siblings().removeClass('fadeIn');
            this.$contents.eq(o.index).addClass('active').siblings().removeClass('active');
            switch (o.index % 4) {
                case 1:
                    this.$bgs.eq(o.index).addClass('leftTop').siblings().removeClass('leftTop');
                    break;
                case 2:
                    this.$bgs.eq(o.index).addClass('rightTop').siblings().removeClass('rightTop');
                    break;
                case 3:
                    this.$bgs.eq(o.index).addClass('leftBottom').siblings().removeClass('leftBottom');
                    break;
                default:
                    this.$bgs.eq(o.index).addClass('rightBottom').siblings().removeClass('rightBottom');
                    break;
            }
            var $title = $('.content-wrapper > .title', this.$contents.eq(o.index));
            var $sub = $('.content-wrapper > .sub-title', this.$contents.eq(o.index));
            $title.dpTextSegment();
            $sub.dpTextSegment({
                lineHeight: 3
            });
            setTimeout(function () {
                o.index++;
                self.init();
            }, o.time)
        }
    });
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new DpCarousel(this, options))
            }
        })
    }
})(jQuery, window, document);

;(function ($, window, document, undefined) {
    var pluginName = 'dpTextSegment', defaults = {
        lineHeight: 10,
        words: 12
    };

    function DpTextSegment(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    $.extend(DpTextSegment.prototype, {
        init: function () {
            var self = this, o = this.options;
            this.element.addClass('dp-text-loader');
            var text = this.element.text();
            var texts = [];
            for (var i = 0; i < text.length / o.words; i++) {
                texts.push(text.slice(i * o.words, (i + 1) * o.words));
            }
            this.element.empty();
            texts.map(function (t) {
                var $el = $('<div class="text-loader-wrapper"/>')
                    .text(t)
                    .appendTo(self.element);
                var $t = $('<div class="wrapper-text"/>')
                    .appendTo($el);
                $('<div class="text-content"/>')
                    .text(t)
                    .appendTo($t);
                $('<div class="wrapper-after"/>')
                    .css('height', self.options.lineHeight)
                    .appendTo($el)
                setTimeout(function () {
                    $t.animate({
                        width: '100%'
                    }, 500)
                }, 1500)
            })
        }
    });
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new DpTextSegment(this, options))
            }
        })
    }
})(jQuery, window, document);