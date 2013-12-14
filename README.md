tap.js
=======================================

A custom 'tap' event JavaScript plugin for mobile and tablet web browsers, which eliminates the 300ms delay between a physical 'tap' and the firing of a 'click' event. Uses mouse events as a fallback for browsers that don't support touch.

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/tap.js/zipball/master)
* [Bower](https://github.com/twitter/bower/): `bower install tap.js`
* Git: `git clone https://github.com/alexgibson/tap.js`

Setup
---------------------------------------

First, include the main tap.js JavaScript file in your HTML document:

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

Supported web browsers
---------------------------------------

- iOS (Safari, Chrome)
- Android (Browser, Chrome)
- Firefox OS, Firefox for Android
- Opera Mobile (Android)
- BlackBerry Playbook
- All modern desktop browsers (mouse fallback)

jQuery Support
---------------------------------------

Should you wish to use tap.js with jQuery, there is an optional [jQuery wrapper](https://github.com/alexgibson/tap.js/blob/master/jquery.tap.js) that you can include in your project.
