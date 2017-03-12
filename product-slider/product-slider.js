/*
Version: 0.1.0
 Author: Thomas Kellermeier
Website: http://www.linkedin.com/in/thomas-kellermeier
   Demo: http://chaoste.github.io/product-slider
   Docs: http://github.com/chaoste/product-slider#product-slider
   Repo: http://github.com/chaoste/product-slider
 Issues: http://github.com/chaoste/product-slider/issues
*/
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
  } /* else if (typeof exports !== 'undefined') {
    // There is nothing to export! This module just adds functionality to jQuery
    module.exports = factory(jQuery)
  } */ else {
    factory(jQuery)
  }
}(function($) {
  // This is used intern to produce code, which is compatible with multiple browser
  $.fn.cssTransition = function(value) {
    return this.css({
      '-webkit-transition': value,
      '-moz-transition': value,
      '-ms-transition': value,
      '-o-transition': value,
      'transition': value,
    })
  }

  // Create a widget, which transforms a given HTML snippet into a images slider
  // Note: Sometimes I'm using the arrow function notation, so I can use the
  // declaration of "this" from the upper scope
  $.widget('nmk.productSlider', {
    // Default options
    options: {
      previewHeight: 450,  // [px]
      slideWidth: 300,  // [px]
      navbarHeight: 150,  // [px]
      animationTime: 400,  // [ms]
      autoplay: 3000,  // [ms]
      stopOnMouseHover: true,
      delayOnClick: 2000,  // [ms]
      zIndex: 10,
    },
    // Intern used variables
    props: {
      selected: undefined,
      sliderContainer: undefined,
      sliderBackground: undefined,
      sliderBar: undefined,
      products: undefined,
      timerDelaied: false,
      carouselTimer: undefined,
    },

    _create: function() {
      this._hideInputElement()
      this._update()
      // Stop carousel as long as the mouse is on the slider (if option is enabled)
      this.props.sliderContainer.on('mouseenter', () => {
        if (this.options.stopOnMouseHover) {
          this._stopCarousel()
        }
      })
      this.props.sliderContainer.on('mouseleave', () => {
        if (this.options.stopOnMouseHover || this.props.carouselTimer === undefined) {
          this._startCarousel()
        }
      })
    },

    _hideInputElement: function() {
      this.element.hide()
    },

    _startCarousel: function(additionalDelay) {
      if (additionalDelay === undefined) {
        additionalDelay = 0
      }
      if (this.props.autoplay <= 0) {
        return
      }
      if (this.props.carouselTimer !== undefined) {
        this._stopCarousel()
      }
      // Dont switch if a slide was clicked (restart the timer)
      this.props.carouselTimer = setTimeout(() => {
        const next = (this.props.selected + 1) % this.props.products.length
        this._deactivateNavElement(this.props.selected)
        this._activateNavElement(next)
        this._startCarousel()
      }, this.options.autoplay + additionalDelay)
    },

    _stopCarousel: function() {
      this.props.carouselTimer = clearTimeout(this.props.carouselTimer)
    },

    _setOption: function(key, value) {
      this.options[key] = value
      this._update()
    },

    _update: function() {
      // Collect products including their image url and description
      this._collectProducts()
      this._createSliderContainer()
      this._createSliderBar()
      // Add created DOM elements to the UI
      this.element.after(this.props.sliderContainer, this.props.sliderBar)
      // Add navigation functionality
      this.props.sliderBar.on('click', 'a', (event) => {
        const c = event.currentTarget
        this._handleNavClick(event, c)
      })
      // Activate the first nav element
      this._activateNavElement(0)
      this._trigger('onInitialized', null, Object.assign({}, this.props.products))
      this._startCarousel()
    },

    _get_selected_product: function() {
      if (this.props.selected === undefined) {
        return undefined
      }
      return this.props.products[this.props.selected]
    },

    _handleNavClick: function(event, el) {
      event.preventDefault()
      // Get "1" from "#slide-1", for example
      const position = $(el).attr('id').split('-').pop()
      this._deactivateNavElement(this.props.selected)
      this._activateNavElement(position, event)
      // Restart the carousel timer with a bit more delay
      this._startCarousel(this.options.delayOnClick)
    },

    _deactivateNavElement: function(position) {
      // Remove highlighting from selected navbar element
      this.props.sliderBar.find(`#slide-link-${position}`)
        .removeClass('active')
      // Hide current slide and its description
      // Fading out a slide is not working right now, because position absolute is
      // missing right now -> Just hide /* .fadeOut(this.options.animationTime) */
      this.props.sliderContainer.find(`#slide-${position}`)
        .hide().removeClass('active')
      this.props.sliderContainer.find(`#slide-description-${position}`)
        .fadeOut(this.options.animationTime)
    },

    _activateNavElement: function(position, event) {
      if (event === undefined) {
        event = null
      }
      const before = this._get_selected_product()
      const animationTime = before === undefined ? 0 : this.options.animationTime
      // Highlight pressed navbar element
      this.props.sliderBar.find(`#slide-link-${position}`).addClass('active')
      // Show the active slide (fading in) and its description
      this.props.sliderContainer.find(`#slide-${position}`)
        .fadeIn(animationTime).addClass('active')
      this.props.sliderContainer.find(`#slide-description-${position}`)
        .fadeIn(animationTime)
      // Adapt the background image
      this.props.sliderContainer.find('.slider-background')
        .css('background-image', `url("${this.props.products[position].url}")`)
      // Update selected property and trigger onNavChanged event
      this.props.selected = position
      this._trigger('onNavChanged', event, { before, current: this._get_selected_product() })
    },

    _createDiv: function(className) {
      return $(document.createElement('div')).addClass(className)
    },

    _collectProducts: function() {
      this.props.products = []
      this.element.find('> div').each((id, c) => {
        'use strict'
        // Collect all required DOM elements
        let contentElem = $(c).find('.content').first()
        const imgElem = $(c).find('img').first()
        const descElem = $(c).find('span').first()
        // If no custom content is defined, just use the image
        if (contentElem.length === 0) {
          contentElem = imgElem
        }
        // The url of an image (used for the preview)
        const url = imgElem.attr('src')
        // Collect the description text
        let description = undefined
        if (descElem.length !== 0) {
          description = descElem.html()
        } else if (contentElem.prop('tagName') === 'A') {
          const link = contentElem.attr('href')
          const text = imgElem.attr('src').replace(/(.*)\/(.*)\.(.*?)$/, '$2')
          description = `<a href="${link}">${text}</a>`
        } else {
          description = imgElem.attr('src').replace(/(.*)\/(.*)\.(.*?)$/, '$2')
        }
        this.props.products.push({ id, url, content: contentElem, description })
      })
    },

    _createSliderContainer: function() {
      this.props.sliderContainer = this._createDiv('slider-container')
        .css('height', this.options.previewHeight)
      const transitionTime = (this.options.animationTime / 1000).toFixed(2)
      this.props.sliderBackground = this._createDiv('slider-background')
        .cssTransition(`background-image ${transitionTime}s ease-out`)
        .css('z-index', this.options.zIndex)
      const slider = this._createDiv('slider')
        .css('width', this.options.slideWidth)
        .css('z-index', this.options.zIndex + 1)
      this.props.products.forEach((productInfo, i) => {
        const slide = this._createDiv('slide').attr('id', `slide-${i}`)
        // const img = $(document.createElement('img')).attr('src', productInfo.url)
        const description = $(document.createElement('span'))
          .attr('id', `slide-description-${i}`)
          .addClass('description')
          .css('z-index', this.options.zIndex + 1)
          .html(productInfo.description)
        // Add the description to the container, to enable a position outside of the slide
        this.props.sliderContainer.append(description)
        slide.append(productInfo.content)
        slider.append(slide)
      })
      this.props.sliderContainer.append(this.props.sliderBackground)
      this.props.sliderContainer.append(slider)
    },

    _createSliderBar: function() {
      this.props.sliderBar = this._createDiv('slider-bar row')
        .css('height', this.options.navbarHeight)
      const transitionTime = (this.options.animationTime / 1000).toFixed(2)
      const colSize = Math.floor(12 / this.props.products.length)
      const colSizeMobile = Math.floor(24 / this.props.products.length)
      this.props.products.forEach((productInfo, i) => {
        const sliderInfo = this._createDiv(`slide-info col-${colSize} col-md-${colSize} col-xs-${colSizeMobile}`).attr('id', i)
        const aLink = $(document.createElement('a'))
          .attr('href', '#')
          .attr('id', `slide-link-${i}`)
          .cssTransition(`opacity ${transitionTime}s ease-out`)
          .addClass('slide-link')
        const img = $(document.createElement('img')).attr('src', productInfo.url)
        aLink.append(img)
        sliderInfo.append(aLink)
        this.props.sliderBar.append(sliderInfo)
      })
    },
  })
}))
