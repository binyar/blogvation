/**
 * Coder: fmd
 * Date: 2017/3/20
 * Time: 10:42
 */
;(function () {
    window.Utils = {
        save: function (data) {
            var config = {
                syncURL: "https://dp-design.wilddogio.com" //输入节点 URL
            };
            wilddog.initializeApp(config);
            var ref = wilddog.sync().ref();
            ref.child('concat').push(data);
        }
    }
})();