Deprecation note
================

Note: this plugin is now deprecated. While bugs may be fixed for legacy support,
no new features will be added. Nearly all modern browsers now provide [native
solutions](http://patrickhlauke.github.io/touch/tests/results/#suppressing-300ms-delay)
for eliminating the 300ms tap delay. Before adding a plugin such as this one to
your website, please first stop to consider if it may actually be needed.

tap.js
------

A custom 'tap' event JavaScript plugin for mobile and tablet web browsers, which eliminates the 300ms delay between a physical 'tap' and the firing of a 'click' event. Uses mouse events as a fallback for browsers that don't support touch.

Installation
------------

* Download: [zip](https://github.com/alexgibson/tap.js/zipball/master)
* [NPM](https://www.npmjs.org/): `npm install tap.js`
* [Bower](https://github.com/twitter/bower/): `bower install tap.js`
* Git: `git clone https://github.com/alexgibson/tap.js`

Setup
-----

This component can be used as an AMD module, CommonJS module, or a global.

### for AMD module:
```
define(['./tap'], function(Tap) {
    // ...
});
```

### for CommonJS:
```
var Tap = require('tap.js');
```

### for global in the browser

```
<script src="tap.js"></script>
```

Next create a new Tap instance, passing the element you want to use:

```
var el = document.getElementById('my-id'),
	myTap = new Tap(el);
```

You can then start listening for 'tap' events using the regular JavaScript event listener syntax:

```
el.addEventListener('tap', onTap, false);

function onTap (e) {
	//your code
}
```

You can stop listening for tap events like so:

```
el.removeEventListener('tap', onTap, false);
```

When a Tap instance is created, it adds a couple of event listeners on its element.
To remove those listeners and cleanup the Tap instance completely, use its `destroy()` function:

```
var myTap = new Tap(el);
myTap.destroy();
```

Supported web browsers
---------------------------------------

- iOS (Safari, Chrome)
- Android (Browser, Chrome)
- Firefox OS, Firefox for Android
- Opera Mobile (Android)
- All modern desktop browsers (mouse fallback)

jQuery Support
---------------------------------------

Should you wish to use tap.js with jQuery, there is an optional [jQuery wrapper](https://github.com/alexgibson/tap.js/blob/master/jquery.tap.js) that you can include in your project.
