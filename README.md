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

MIT License
---------------------------------------

Copyright (c) 2012 - 2013 Alex Gibson

http://alxgbsn.co.uk/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction except as noted below, including without limitation the rights to use, copy, modify, merge, publish, distribute, and/or sublicense, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
