/*
 *
 * Find more about this plugin by visiting
 * http://alxgbsn.co.uk/
 *
 * Copyright (c) 2013 Alex Gibson, http://alxgbsn.co.uk/
 * Released under MIT license
 *
 */

/*global window: false, document: false */

(function (window, document) {

	'use strict';

	function Tap(el) {
		this.element = typeof el === 'object' ? el : document.getElementById(el);
		this.moved = false; //flags if the finger has moved
		this.startX = 0; //starting x coordinate
		this.startY = 0; //starting y coordinate
		this.hasTouchEventOccured = false; //flag touch event
		this.element.addEventListener('touchstart', this, false);
		this.element.addEventListener('mousedown', this, false);
	}

	//start			
	Tap.prototype.start = function (e) {
		if (e.type === 'touchstart') {
			this.hasTouchEventOccured = true;
		}
		this.moved = false;
		this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
		this.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
		this.element.addEventListener('touchcancel', this, false);
		this.element.addEventListener('mousemove', this, false);
		this.element.addEventListener('mouseup', this, false);
	};

	//move	
	Tap.prototype.move = function (e) {
		var x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX,
			y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

		//if finger moves more than 10px flag to cancel
		if (Math.abs(x - this.startX) > 10 || Math.abs(y - this.startY) > 10) {
			this.moved = true;
		}
	};

	//end
	Tap.prototype.end = function (e) {
		var evt;

		if (this.hasTouchEventOccured && e.type === 'mouseup') {
			e.preventDefault();
			e.stopPropagation();
			this.hasTouchEventOccured = false;
			return;
		}

		if (!this.moved) {
			evt = document.createEvent('Event');
			evt.initEvent('tap', true, true);
			e.target.dispatchEvent(evt);
		}
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);
		this.element.removeEventListener('touchcancel', this, false);
		this.element.removeEventListener('mousemove', this, false);
		this.element.removeEventListener('mouseup', this, false);
	};

	//touchcancel
	Tap.prototype.cancel = function (e) {
		//reset state
		this.moved = false;
		this.startX = 0;
		this.startY = 0;
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);
		this.element.removeEventListener('touchcancel', this, false);
		this.element.removeEventListener('mousemove', this, false);
		this.element.removeEventListener('mouseup', this, false);
	};

	Tap.prototype.handleEvent = function (e) {
		switch (e.type) {
		case 'touchstart': this.start(e); break;
		case 'touchmove': this.move(e); break;
		case 'touchend': this.end(e); break;
		case 'touchcancel': this.cancel(e); break;
		case 'mousedown': this.start(e); break;
		case 'mousemove': this.move(e); break;
		case 'mouseup': this.end(e); break;
		}
	};

	//public function
	window.Tap = Tap;

}(window, document));