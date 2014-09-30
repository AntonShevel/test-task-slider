/*
 var config = {
 // arbitrary number of images
 images: [
 'http://example.com/image-1.jpg',
 'http://example.com/image-2.jpg',
 'http://example.com/image-3.jpg',
 'http://example.com/image-4.jpg'
 ],

 mode: 'auto', // possible values: 'auto', 'manual', 'automanual'
 swipeSpeed: 500, // arbitrary interger (miliseconds)
 swipeDelay: 3000 // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
 };

 */
/*jslint browser:true */
/*jslint nomen: true*/

function SwipeSlider(container, options) {
    var _options = {},
        _slides = [],
        _activeSlide,
        _direction = -1,
        _this = this;


    // assign options
    function setOption(option, value) {
        _options[option] = value;
    }

    function getOption(option) {
        return _options[option];
    }

    function setOptions(options) {
        var key;
        for (key in options) {
            if (options.hasOwnProperty(key)) {
                setOption(key, options[key]);
            }
        }
    }

    // build dom
    function createDom() {

        var images = getOption('images'),
            placeholder = getOption('container'),
            img,
            i;

        _this.container = document.createElement('div');
        _this.container.className = 'slides';

        for (i = 0; images[i]; i += 1) {
            img = document.createElement('img');
            img.src = images[i];
            if (i === 0) {
                img.className = 'active';
                _activeSlide = img;
            }
            if (img.naturalWidth !== 0) {
                _this.container.appendChild(img);
                _slides.push(img);
            }
        }
        _this.setTransition(_this.container, getOption('swipeSpeed'));
        placeholder.appendChild(_this.container);
    }

    //events
    function bindEvents() {

        if (getOption('mode') === 'auto') {
            return;
        }

        var started = false,
            container = getOption('container'),
            touch;

        function swipeStart(event) {
            if (started || (event.type !== "mousedown" && event.touches.length !== 1)) {
                return;
            }
            started = true;
            touch = getCoordinate(event);
        }

        function swipeContinue(event) {
            if (!started) {
                return;
            }
            event.preventDefault();
        }

        function swipeEnd(event) {
            if (!started) {
                return;
            }
            started = false;
            var currTouch = getCoordinate(event),
                minDelta = 25,
                delta = currTouch - touch;

            if (Math.abs(delta) > minDelta) {
                _this.change(delta);
            }
        }

        function getCoordinate(event) {
            var coordinate = false;
            if (event instanceof MouseEvent) {
                coordinate = event.clientX;
            } else if (event instanceof TouchEvent) {
                coordinate = event.changedTouches[0].clientX;
            }
            return coordinate;
        }

        container.addEventListener("touchstart", swipeStart, false);
        container.addEventListener("touchmove", swipeContinue, false);
        container.addEventListener("touchend", swipeEnd, false);
        container.addEventListener("touchcancel", swipeEnd, false);
        container.addEventListener("touchleave", swipeEnd, false);

        container.addEventListener("mousedown", swipeStart, false);
        container.addEventListener("mousemove", swipeContinue, false);
        container.addEventListener("mouseleave", swipeEnd, false);
        container.addEventListener("mouseup", swipeEnd, false);

        container.addEventListener("dragstart", function (event) { event.preventDefault(); }, false);

    }

    // add auto slide auto change
    function addAutoSwipe() {
        if (getOption('mode') === 'manual') {
            return;
        }

        window.setInterval(function () {
            _this.change(_direction);
            if (_activeSlide === sibling(_direction)) {
                _direction *= -1;
            }
        }, getOption('swipeDelay'));
    }

    // get neighbour slide element
    function sibling(delta) {
        var direction = delta > 0 ? 1 : -1;
        return _slides[_slides.indexOf(_activeSlide) - direction] || _activeSlide;
    }

    this.getSibling = function (direction) {
        return sibling(direction);
    };

    this.getSlides = function () {
        return _slides;
    };

    this.getActiveSlide = function() {
        return _activeSlide;
    };

    this.setActiveSlide = function(slide) {
        _activeSlide = slide;
    };

    setOptions(options);
    setOption('container', container);
    createDom();
    bindEvents();
    addAutoSwipe();

}

// change slide to sibling
SwipeSlider.prototype.change = function(direction) {
    var nextSlide = this.getSibling(direction),
        activeSlide = this.getActiveSlide(),
        _this = this;
    if (nextSlide === activeSlide) {
        return;
    }
    activeSlide.className = '';
    nextSlide.className = 'active';
    _this.setActiveSlide(nextSlide);
    _this.container.style.left = -activeSlide.offsetLeft + 'px';
};

// set transition duration
SwipeSlider.prototype.setTransition = function(element, duration) {

};



function SwipeSliderSlide (element, settings) {
    SwipeSlider.call(this, element, settings);
}
SwipeSliderSlide.prototype = Object.create(SwipeSlider.prototype);

SwipeSliderSlide.prototype.change = function(direction) {
    var nextSlide = this.getSibling(direction),
        activeSlide = this.getActiveSlide(),
        _this = this;
    if (nextSlide === activeSlide) {
        return;
    }
    activeSlide.className = '';
    nextSlide.className = 'active';
    _this.setActiveSlide(nextSlide);
    _this.container.style.left = -activeSlide.offsetLeft + 'px';
};

SwipeSliderSlide.prototype.setTransition = function(element, duration) {
    var properties = ['transition', 'MozTransition', 'WebkitTransition', 'msTransition', 'OTransition'],
        transition = 'all %duration%ms ease',
        i;
    for (i = 0; properties[i]; i += 1) {
        if (properties[i] in element.style) {
            element.style[properties[i]] = transition.replace(/%duration%/, duration);
            break;
        }
    }
};


function SwipeSliderFade (element, settings) {
    SwipeSlider.call(this, element, settings);
}

SwipeSliderFade.prototype = Object.create(SwipeSlider.prototype);

SwipeSliderFade.prototype.change = function(direction) {
    var nextSlide = this.getSibling(direction),
        activeSlide = this.getActiveSlide(),
        _this = this;
    if (nextSlide === activeSlide) {
        return;
    }
    activeSlide.className = '';
    activeSlide.style.opacity = 0;
    nextSlide.className = 'active';
    nextSlide.style.opacity = 1;
    console.log(activeSlide, nextSlide);
    _this.setActiveSlide(nextSlide);

};

SwipeSliderFade.prototype.setTransition = function(element, duration) {
    var properties = ['transition', 'MozTransition', 'WebkitTransition', 'msTransition', 'OTransition'],
        transition = 'all %duration%ms ease',
        elements = this.getSlides(),
        i;

    elements.forEach(function(element){
        for (i = 0; properties[i]; i += 1) {
            element.style.opacity = element.className === 'active' ? 1 : 0;
            element.style.position = 'absolute';
            if (properties[i] in element.style) {
                element.style[properties[i]] = transition.replace(/%duration%/, duration);
                break;
            }
        }
    });
};