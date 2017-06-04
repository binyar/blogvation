/**
 * Coder: fmd
 * Date: 2017/5/24
 * Time: 11:31
 */
;(function () {
    var $loader = $('#loader');
    var shouldLoad = false;
    if ($loader.length) {
        $loader.children('.load-icon').addClass('active');
        var index = 1;
        setTimeout(function () {
            doPro();
        }, 400);
        function doPro() {
            var r = random();
            setTimeout(function () {
                if (index < 100) {
                    progress(index);
                    var step = parseInt(100 * (r / 1000), 10);
                    index += step;
                    doPro();
                } else {
                    if (shouldLoad) {
                        onload();
                    }
                }
            }, r)
        }
    }

    function random() {
        return parseInt(Math.random() * 100, 10);
    }

    function progress(progress) {
        var $icon = $('.load-icon', $loader);
        $('.icon-text', $icon).text(progress + '%');
        $('.progress', $icon).css('right', (100 - progress) + '%');
    }

    function onload() {
        if ($loader.length) {
            if (index < 100) {
                shouldLoad = true;
                return;
            }
            var $icon = $('.load-icon', $loader);
            $icon.children('.icon-text').text('100%');
            $icon.children('.progress').css('right', '0');
            $('.load-mask', $loader).addClass('active');
            setTimeout(function () {
                $loader.animate({
                    opacity: 0
                }, 200, function () {
                    $loader.remove();
                    $('body').removeClass('hidden');
                    var $header = $('.dp-activation-page >.dp-activation-page-home >.home-header');
                    var $main = $('.dp-activation-page >.dp-activation-page-home >.home-main-body');
                    if ($header.length) {
                        $header.addClass('fadeIn');
                    }
                    if ($main.length) {
                        $main.addClass('fadeIn');
                    }
                })
            }, 1000)
        } else {
            $('body').removeClass('hidden');
        }
    }

    window.DP = {
        onload: function () {
            onload();
        }
    }
    bindLink();
    bindMenu();
    function bindLink() {
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
            })
            return false;
        });
    }

    function bindMenu() {
        $('#item-menu').on('click', function () {
            $('#menu-mask').show()
                .animate({
                    opacity: 1
                }, 400);
        })
        $('#menu-close').on('click', function () {
            $('#menu-mask').animate({
                opacity: 0
            }, 400, function () {
                $('#menu-mask').hide();
            })
        })
    }
})();