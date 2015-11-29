/*!
 * tap.js
 * Copyright (c) 2013 Alex Gibson, http://alxgbsn.co.uk/
 * Released under MIT license
 */

/* global define, module */
(function (global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return (global.Tap = factory(global, global.document));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(global, global.document);
    } else {
        global.Tap = factory(global, global.document);
    }
}(typeof window !== 'undefined' ? window : this, function (window, document) {
    'use strict';

    function Tap(el) {
        this.el = typeof el === 'object' ? el : document.getElementById(el);
        this.moved = false; //flags if the finger has moved
        this.startX = 0; //starting x coordinate
        this.startY = 0; //starting y coordinate
        this.hasTouchEventOccured = false; //flag touch event
        this.el.addEventListener('touchstart', this, false);
        this.el.addEventListener('mousedown', this, false);
    }

    function fixupMouse( event ) {
        event = event || window.event;
        var e = { event: event,
            target: 'target' in event ? event.target : event.srcElement,
            which: 'which' in event ? event.which : // otherwise MSIE<8
                 event.button === 1 ? 1 :   // left
                 event.button === 2 ? 3 :   // right
                 event.button === 4 ? 2 : 1,// center
            buttons: 0,
            button: 0,
            x: 'x' in event ? event.x : event.clientX,
            y: 'y' in event ? event.y : event.clientY
        };
        e.button = e.which - 1;
        e.buttons = 'buttons' in event ? event.buttons :
                 e.which === 1 ? 1 :   // left
                 e.which === 3 ? 2 :   // right
                 e.which === 2 ? 4 : 1;// center
        return e;
    }

    Tap.prototype.start = function(e) {
        e = fixupMouse(e);
        if (e.event.type === 'touchstart') {

            this.hasTouchEventOccured = true;
            this.el.addEventListener('touchmove', this, false);
            this.el.addEventListener('touchend', this, false);
            this.el.addEventListener('touchcancel', this, false);

        } else if (e.event.type === 'mousedown' && e.button == 0) {

            this.el.addEventListener('mousemove', this, false);
            this.el.addEventListener('mouseup', this, false);
        }

        this.moved = false;
        this.startX = e.event.type === 'touchstart' ? e.event.touches[0].clientX : e.event.clientX;
        this.startY = e.event.type === 'touchstart' ? e.event.touches[0].clientY : e.event.clientY;
    };

    Tap.prototype.move = function(e) {
        //if finger moves more than 10px flag to cancel
        var x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        var y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        if (Math.abs(x - this.startX) > 10 || Math.abs(y - this.startY) > 10) {
            this.moved = true;
        }
    };

    Tap.prototype.end = function(e) {
        var evt;

        this.el.removeEventListener('touchmove', this, false);
        this.el.removeEventListener('touchend', this, false);
        this.el.removeEventListener('touchcancel', this, false);
        this.el.removeEventListener('mouseup', this, false);
        this.el.removeEventListener('mousemove', this, false);

        if (!this.moved) {
            //create custom event
            try {
                evt = new window.CustomEvent('tap', {
                    bubbles: true,
                    cancelable: true
                });
            } catch (e) {
                evt = document.createEvent('Event');
                evt.initEvent('tap', true, true);
            }

            //prevent touchend from propagating to any parent
            //nodes that may have a tap.js listener attached
            e.stopPropagation();

            // dispatchEvent returns false if any handler calls preventDefault,
            if (!e.target.dispatchEvent(evt)) {
                // in which case we want to prevent clicks from firing.
                e.preventDefault();
            }
        }
    };

    Tap.prototype.cancel = function() {
        this.hasTouchEventOccured = false;
        this.moved = false;
        this.startX = 0;
        this.startY = 0;
    };

    Tap.prototype.destroy = function() {
        this.el.removeEventListener('touchstart', this, false);
        this.el.removeEventListener('touchmove', this, false);
        this.el.removeEventListener('touchend', this, false);
        this.el.removeEventListener('touchcancel', this, false);
        this.el.removeEventListener('mousedown', this, false);
        this.el.removeEventListener('mouseup', this, false);
        this.el.removeEventListener('mousemove', this, false);
    };

    Tap.prototype.handleEvent = function(e) {
        switch (e.type) {
            case 'touchstart': this.start(e); break;
            case 'touchmove': this.move(e); break;
            case 'touchend': this.end(e); break;
            case 'touchcancel': this.cancel(e); break;
            case 'mousedown': this.start(e); break;
            case 'mouseup': this.end(e); break;
            case 'mousemove': this.move(e); break;
        }
    };

    return Tap;
}));


