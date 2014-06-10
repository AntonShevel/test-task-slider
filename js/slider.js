/*
- make it oop
-- js inheritance pattern ?
- create DOM
- track swipe touch
- track mouse swipe
- add animation
- jslint

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


function SwipeSlider(container, options) {
    var _this = this,
        _options = {},
        _container,
        _slides = [],
        _activeSlide,
        _direction = -1;
//    this.container = container;
//    this.options = {};


    // assign options
    function setOption(option, value) {
        _options[option] = value;
    }

    function getOption(option){
        return _options[option];
    }

    function setOptions(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key))
                setOption(key, options[key]);
        }
    }
    // build dom
    function createDom() {

        var images = getOption('images'),
            placeholder = getOption('container'),
            img;

        _container = document.createElement('div'),
        _container.className = 'slides';
        setTransition(_container);

        for (var i = 0; images[i]; i++) {
            img = document.createElement('img');
            img.src = images[i];
            //todo move to separate method
            if (i===0) {
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

        if (getOption('mode') == 'auto')
            return false;

        var started = false,
            container = getOption('container'),
            touch;

        container.addEventListener("touchstart", swipeStart, false);
        container.addEventListener("touchmove", swipeContinue, false);
        container.addEventListener("touchend", swipeEnd, false);
        container.addEventListener("touchcancel", swipeEnd, false);
        container.addEventListener("touchleave", swipeEnd, false);

        container.addEventListener("mousedown", swipeStart, false);
        container.addEventListener("mousemove", swipeContinue, false);
        container.addEventListener("mouseleave", swipeEnd, false);
        container.addEventListener("mouseup", swipeEnd, false);

        container.addEventListener("dragstart", function(event) {event.preventDefault();}, false);


        function swipeStart(event) {
            if (started || (event.type != "mousedown" && event.touches.length != 1))
                return;

            started = true;
            touch = getCoordinate(event);
        }
        function swipeContinue(event) {

            if(!started)
                return;
            event.preventDefault();
        }
        function swipeEnd(event) {

            if(!started)
                return;

            started = false;
            var currTouch = getCoordinate(event),
                minDelta = 25,
                delta = currTouch - touch;

            if (Math.abs(delta) > minDelta)
                change(delta);
        }
        function getCoordinate(event) {
            var coordinate = false;
            if (event instanceof MouseEvent)
                coordinate = event.clientX;
            else if (event instanceof TouchEvent)
                coordinate = event.changedTouches[0].clientX; //pageX

            return coordinate;
        }

    }
    function setTransition(element)
    {
        var duration = getOption('swipeSpeed'),
            properties = ['transition', 'MozTransition', 'WebkitTransition', 'msTransition', 'OTransition'];
        for (var i = 0; properties[i]; i++) {
            if (properties[i] in element.style) {
                element.style[properties[i]] = 'all ' + duration + 'ms ease';
                break;
            }
        }
//        element.
    }
    function addAutoSwipe() {
        if (getOption('mode') === 'manual')
            return;
        console.log('set interval');
//        window.setTimeout(function() {
        window.setInterval(function() {
            change(_direction);
            if (_activeSlide == sibling(_direction))
                _direction *= -1;
//            addTimeOut();
        }, getOption('swipeDelay'));
    }
    function change(direction) {
        var direction = direction > 0 ? 1 : -1,
            nextSlide = sibling(direction);
        if (nextSlide == _activeSlide) return;
        _activeSlide.className = '';
        nextSlide.className = 'active';
        _activeSlide = nextSlide;
        _container.style.left = -_activeSlide.offsetLeft + 'px';
    }
    function sibling(direction) {
        var direction = direction > 0 ? 1 : -1,
            nextSlide = _slides[_slides.indexOf(_activeSlide)-direction] ? _slides[_slides.indexOf(_activeSlide)-direction] : _activeSlide;
        return nextSlide;
    }

    this.prev = function() {
        change(1);
    };

    this.next = function() {
        change(-1);
    };

    this.current = function() {
        return _activeSlide;
    };

    this.nextSlide = function() {
        return sibling(1);
    };

    this.prevSlide = function() {
        return sibling(-1);
    };

    this.getSlides = function() {
        return _slides;
    }

    setOptions(options);
    setOption('container', container);
    createDom();
    bindEvents(this.prev,this.next);
    addAutoSwipe();

}

/*
SwipeSlider.prototype = {
    getActiveSlide: function() {
        var image = this.container.getElementsByClassName('active')[0],
            images = this.container.getElementsByTagName('img');
        console.log( images, image );
        return this.container.getElementsByClassName('active')[0];
    },

    prevSlide: function() {
        var slide = this.getActiveSlide(),
            slides = this.container.getElementsByClassName('slides')[0];

        slides.style.left =slides.offsetLeft - slide.clientWidth + "px";
    },

    nextSlide: function() {
        var slide = this.getActiveSlide(),
            slides = this.container.getElementsByClassName('slides')[0];

        slides.style.left =slides.offsetLeft + slide.clientWidth + "px";
    }
};
*/
/*
SwipeSlider.prototype.getActiveSlide = function() {
    return this.container.getElementsByClassName('active')[0];
};

SwipeSlider.prototype.nextSlide = function() {
    console.log(this);
    var slide = this.getActiveSlide(),
        slides = this.container.getElementsByClassName('slides')[0];
    slides.style.left -= slide.clientWidth;

};

SwipeSlider.prototype.prevSlide = function() {
    console.log('prev');
};
*/