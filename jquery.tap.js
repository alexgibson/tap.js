/*!
 * jQuery special event "tap" using tap.js
 * Released under MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'tap'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('tap'));
    } else {
        factory(jQuery, Tap);
    }
}(function ($, Tap) {
    'use strict';

    $.event.special.tap = (function () {

        // Fallback to click events in old IE
        if (!document.addEventListener) return { bindType: 'click', delegateType: 'click' };

        var dataKey = 'tap.js';

        return {
            setup: function () {
                $.data(this, dataKey, new Tap(this));

                return false;
            },
            teardown: function () {
                var tap = $.data(this, dataKey);
                if (tap && tap.destroy) {
                    tap.destroy();
                    $.removeData(this, dataKey);
                }

                return false;
            }
        };
    }());
}));
