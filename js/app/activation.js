/**
 * Coder: fmd
 * Date: 2017/5/24
 * Time: 11:31
 */
;(function () {
    page('/', function () {

    });
    page('/home', function () {
        console.log('..home')
    });
    page({
        hashbang: true
    });
    page.redirect();
})();