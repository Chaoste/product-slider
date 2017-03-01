js-product-slider
-------

[1]: <https://github.com/chaoste/product-slider>

_A smooth lightweight slider for presenting products_

#### Demo

[http://chaoste.github.io/product-slider](http://chaoste.github.io/product-slider/)

#### CDN

To start working with product-slider right away, there's a couple of CDN choices available
to serve the files as close, and fast as possible to your users:

- https://cdnjs.com/libraries/product-slider
- https://www.jsdelivr.com/projects/jquery.product-slider

You can also download the code with the following link:

- https://github.com/chaoste/product-slider/archive/master.zip

##### Example using jsDelivr

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
    <img src="1.jpg"></img>
    <span>Artist 1 - Song 1</span>
  </div>
  <div>
    <img src="2.png"></img>
    <span>Artist 1 - Song 2</span>
  </div>
  <div>
    <img src="3.jpeg"></img>
    <span>Artist 2 - Song 1</span>
  </div>
  <div>
    <img src="4.gif"></img>
    <span>Artist 3 - Song 1</span>
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
    <a class="content" href="https://product-webpage.com"><img src="1.jpg"></img></a>
    <span><a href="https://product-webpage.com">Artist 1 - Song 1</a></span>
  </div>
  <!-- ... -->
```

In this case we want to add a link to the preview image and its description block.
If you add outer tags to the preview image, you have to add the class "content", so
the product-slider recognizes your element.

For editing he description you can only change the content within the `<span>` element.


### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
previewHeight | int [px] | 450 | Height of the upper preview container
slideWidth | int [px] | 300 | Width of the centered product covers
navbarHeight | int [px] | 150 | Height of the navigation bar
animationTime | int [ms] | 400 | Transition time for almost all css changes
stillstandingTime | int [ms] | 3000 | Waiting time until the next slide is shown
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
onInitialized | event (null), intern hold information of all products | Slider is rebuilt (after creating or updating)
onNavChanged | event (null or onClick event), { old product, new product } | The shown product changed (caused by any case)

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

#### Dependencies

jQuery >= 3.1.1
jQuery UI >= 1.11.4

#### License

Copyright (c) 2017 Thomas Kellermeier

Licensed under the MIT license.



### Memo to myself

Next steps after the first version is developed:
1. Offer a minified version (http://javascript-minifier.com/, http://cssminifier.com/)
2. Publish at plugins.jquery.com and npmjs.com (node and bower module)
3. Use CDN (e.g. cdnjs, jsDelivr)
