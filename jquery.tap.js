/*!
 * jQuery special event "tap" using tap.js
 * Released under MIT license
 */
(function ($) {
    'use strict';
    
    $.event.special.tap = (function () {
        
        // Fallback to click events in old IE
        if (!document.addEventListener) return { bindType: 'click', delegateType: 'click' };
        
        var Tap = window.Tap;
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
}(window.jQuery));
