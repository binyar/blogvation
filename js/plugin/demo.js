/**
 * Coder: fmd
 * Date: 2017/5/7
 * Time: 22:46
 */
// 这个分号的作用是防止和其他jquery插件合并时，别人不规范的jquery插件忘记使用分号结束
//影响到我们当前的插件，导致无法运行的问题。
;(function ( $, window, document, undefined ) {

    // undefined作为形参的目的是因为在es3中undefined是可以被修改的
    //比如我们可以声明var undefined = 123,这样就影响到了undefined值的判断，幸运的是在es5中,undefined不能被修改了。
    // window和document本身是全局变量，在这个地方作为形参的目的是因为js执行是从里到外查找变量的（作用域），把它们作为局部变量传进来，就避免了去外层查找，提高了效率。

    // 声明默认属性对象
    var pluginName = "defaultPluginName",
        defaults = {
            propertyName: "value"
        };

    // 构造函数
    function Plugin ( element, options ) {
        this.element = element;
        // 将默认属性对象和传递的参数对象合并到第一个空对象中
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // 为了避免和原型对象Plugin.prototype的冲突，这地方采用继承原型对象的方法
    $.extend(Plugin.prototype, {
        init: function () {
            // 初始化，由于继承自Plugin原型，
            // 你可以在这里直接使用this.element或者this.settings
            console.log("xD");
        },
        yourOtherFunction: function () {
            // some logic
        }
    });

    // 对构造函数的一个轻量级封装，
    // 防止产生多个实例
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // 方便链式调用
        return this;
    };

})( jQuery, window, document );