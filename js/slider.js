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
    var _this = this;

    this.container = container;
    this.options = {};
    setOptions(options);
    createDom();
    bindSwipe(this.prevSlide, this.nextSlide);


    //options
    function setOption(option, value) {
            _this.options[option] = value;
    }

    function getOption(option){
        return _this.options[option];
    }

    function setOptions(options) {
        for (var key in options) {
            setOption(key, options[key]);
        }
    }
    //dom
    function createDom() {
        var slides = document.createElement('div'),
            images = getOption('images'),
            image;

        slides.className = 'slides';

        for (var i = 0; images[i]; i++) {
            image = document.createElement('img');
            image.src = images[i];
            if (i===0)
                image.className = 'active';
            slides.appendChild(image);
        }
        _this.container.appendChild(slides);
    }
    //events
    function bindSwipe(prev, next) {
        var started = false,
            container = _this.container,
            touch,
            prevTouch;

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
            touch = prevTouch = getCoordinate(event);
        }
        function swipeContinue(event) {

            if(!started)
                return;
            var currTouch = getCoordinate(event);

//            if ((currTouch - prevTouch) > 0)
//                _this.moveNext(currTouch - touch);
//            else
//                _this.movePrev(touch - currTouch);

            prevTouch = currTouch;

        }
        function swipeEnd(event) {

            if(!started)
                return;

            started = false;
            var currTouch = getCoordinate(event)

            if ((currTouch - touch) > 0)
                next.call(_this);
            else
                prev.call(_this);
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

}

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
    },

    moveNext: function(offset) {
        console.log(offset);
        var slide = this.getActiveSlide(),
            slides = this.container.getElementsByClassName('slides')[0];
        slides.style.left =slides.offsetLeft + offset + "px";
    },

    movePrev: function(offset) {
        console.log(offset);
        var slide = this.getActiveSlide(),
            slides = this.container.getElementsByClassName('slides')[0];
        slides.style.left =slides.offsetLeft - offset + "px";
    }
};
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