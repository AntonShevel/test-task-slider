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
        _container,
        _slides = [],
        _activeSlide,
        _direction = -1;


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

        _container = document.createElement('div');
        _container.className = 'slides';
        setTransition(_container);

        for (i = 0; images[i]; i += 1) {
            img = document.createElement('img');
            img.src = images[i];
            if (i === 0) {
                img.className = 'active';
                _activeSlide = img;
            }
            _container.appendChild(img);
            _slides.push(img);
        }
        placeholder.appendChild(_container);
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
                change(delta);
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

    // set transition duration
    function setTransition(element) {
        var duration = getOption('swipeSpeed'),
            properties = ['transition', 'MozTransition', 'WebkitTransition', 'msTransition', 'OTransition'],
            transition = 'all %duration%ms ease',
            i;
        for (i = 0; properties[i]; i += 1) {
            if (properties[i] in element.style) {
                element.style[properties[i]] = transition.replace(/%duration%/, duration);
                break;
            }
        }
    }

    // add auto slide auto change
    function addAutoSwipe() {
        if (getOption('mode') === 'manual') {
            return;
        }

        window.setInterval(function () {
            change(_direction);
            if (_activeSlide === sibling(_direction)) {
                _direction *= -1;
            }
        }, getOption('swipeDelay'));
    }

    // change slide to sibling
    function change(direction) {
        var nextSlide = sibling(direction);
        if (nextSlide === _activeSlide) {
            return;
        }
        _activeSlide.className = '';
        nextSlide.className = 'active';
        _activeSlide = nextSlide;
        _container.style.left = -_activeSlide.offsetLeft + 'px';
    }

    // get neighbour slide element
    function sibling(delta) {
        var direction = delta > 0 ? 1 : -1,
            nextSlide = _slides[_slides.indexOf(_activeSlide) - direction] || _activeSlide;
        return nextSlide;
    }

    this.prev = function () {
        change(1);
    };

    this.next = function () {
        change(-1);
    };

    this.current = function () {
        return _activeSlide;
    };

    this.nextSlide = function () {
        return sibling(1);
    };

    this.prevSlide = function () {
        return sibling(-1);
    };

    this.getSlides = function () {
        return _slides;
    };

    setOptions(options);
    setOption('container', container);
    createDom();
    bindEvents();
    addAutoSwipe();

}
