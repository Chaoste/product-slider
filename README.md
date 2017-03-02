product-slider
-------

[1]: <https://github.com/chaoste/product-slider>

_A smooth lightweight slider for presenting products_

#### Demo

[http://chaoste.github.io/product-slider](http://chaoste.github.io/product-slider/)

#### CDN

To start working with product-slider right away, there's a a CDN available
to serve the files as close, and fast as possible to your users:

- https://www.jsdelivr.com/projects/jquery.product-slider

You can also download the code with the following link:

- https://github.com/chaoste/product-slider/archive/master.zip

##### Example

Just add a link to the css file in your `<head>`

```html
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.product-slider/0.1.0/product-slider.min.css"/>
```

Then, before your closing `<body>` tag add

```html
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.ui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.product-slider/0.1.0/product-slider.min.js"></script>
```

#### Package Managers

```sh
# Bower
bower install --save product-slider

# NPM
npm install product-slider
```

#### Usage

To define the content of the slides, you can write it down as a short HTML snippet:

```html
<div id="my-slider">
  <div>
    <img src="Artist 1 - Song 1.jpg"></img>
  </div>
  <div>
    <img src="Artist 1 - Song 2.png"></img>
  </div>
  <div>
    <img src="Artist 2 - Song 1.jpeg"></img>
  </div>
</div>
```

To transform this into a product-slider, you have to call the JQuery plugin on this element.

```javascript
$('#my-slider').productSlider()
```

### Custom elements

If you want to change the preview element, you can rewrite the input code like this:

```html
<div id="my-advanced-slider">
  <div>
    <a class="content" href="https://product-webpage.com">
      <img src="Artist 1 - Song 1.jpg"></img>
    </a>
  </div>
  <!-- ... -->
```

In this case we want to add a link to the preview image and its description block.
If you add outer tags to the preview image, you have to add the class "content", so
the product-slider recognizes your element.

For editing he description you can only change the content within the `<span>` element.

It's also possible, to split up the logic of the description element and the product preview.


```html
<div id="my-advanced-slider-2">
  <div>
    <a class="content" href="https://product-webpage.com">
      <img src="picture.jpg"></img>
    </a>
    <span class="description">
      <a href="https://product-webpage.com">
        Artist 1 - Song 1
      </a>
    </span>
  </div>
  <!-- ... -->
```

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
previewHeight | int [px] | 450 | Height of the upper preview container
slideWidth | int [px] | 300 | Width of the centered product covers
navbarHeight | int [px] | 150 | Height of the navigation bar
animationTime | int [ms] | 400 | Transition time for almost all css changes
autoplay | int [ms] | 3000 | Waiting time until the next slide is shown (value <= 0 -> Disable autoplay)
stopOnMouseHover | boolean | true | If the mouse is on the upper container the carousel stops
delayOnClick | int [ms] | 2000 | After manually selecting a product wait an additional time, until the carousel goes on

```javascript
$('#my-slider').productSlider({
  animationTime: 5000,
})
```

You're also able to change attributes, after you already created a product-slider.

```javascript
$('#my-slider').productSlider()
// ...
$('#my-slider').option('animationTime', 200)
```

_Note that this will recreate all DOM elements of the product-slider._


### Event triggers

Event | Parameters | Description
------ | ------- | -----------
onInitialized | event (null), \n intern hold information of all products | Slider is rebuilt (after creating or updating)
onNavChanged | event (null or onClick event), \n { old product, new product } | The shown product changed (caused by any case)

```javascript
$('#my-slider').productSlider({
  animationTime: 200,
  onNavChanged: (event, payload) => {
    const { before, current } = payload
    console.info(`The shown product changed from ${before.id} to ${current.id}`)
  }
})
```

#### Browser support

Product-slider works on IE8+ in addition to other modern browsers such as Chrome, Firefox, and Safari.

#### Node.js

You may want to use this module within a Node.js environment. You can find a tutorial on how to use jQuery in Node.js [here](http://quaintous.com/2015/07/31/jqery-node-mystery/).

```javascript
var jsdom = require('jsdom')

jsdom.env(
 'https://chaoste.github.io',
 function (err, window) {
   jQuery = require('jquery')(window)
   require('jquery-ui')
   require('product-slider')
   // --- your code ---
 }
)
```


#### Dependencies

jQuery >= 3.1.1
jQuery UI >= 1.11.4

#### License

Copyright (c) 2017 Thomas Kellermeier

Licensed under the MIT license.



### Memo to myself

Next steps after the first version is developed:
2. Publish at plugins.jquery.com and npmjs.com (node and bower module)
