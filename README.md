## Synopsis

This is a JavaScript file that makes text 3D, it uses CSS to apply a shadow and transformations. The text follows the mouse i.e. keeps looking at it.


## Installation

Easy Peasy, just include the `followMouse.js` file in your html:

`<script id="javascript" src="followMouse.js"></script>`

## Usage

Make a `<div>` or something with the text in it.

IMPORTANT: make sure to set `display:inline-block;` if it would otherwise default to `block`.

Then just give the text an `id` in the html and in the `<script>` section write this:


`var text = document.getElementById('text');`
`followMouse.add(text,'#009',20,50,50,45,true);`
`followMouse.activate();`

The add function `followMouse.add(element, color, depth, tilt, steps, maxAngle, dropShadow);`
needs the parameters:
* `element`: reference to the element containing the text
* `color`: the hex code of the shadow as a string eg: '#009'
* `depth`: the depth of the shadow as an integer
* `tilt`: the amount of tilting that happens as the mouse is moved (integer)
* `steps`: the number of individual shadows (integer) that need to be overlaid, the larger the higher the resolution but also the more strain on the browser, this should always be equal to or greater the `depth`, a factor of 1 to 3 times is a good range
* `maxAngle`: the angle in degrees at which the text stops tilting, I found 45 is a good value for this
* `dropShadow`: boolean, determines whether or not to add a black drop shadow below the text
