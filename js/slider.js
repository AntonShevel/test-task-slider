/*
- make it oop
-- js inheritance pattern ?
- create DOM
- track swipe touch
- track mouse swipe
- add animation

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
        container = container;
    this.container = container;
    setOptions(options);
    createDom();
    bindSwipe(this.slideLeft, this.slideRight);

    //options
    function setOption(option, value) {
//        if (_this[option] != undefined)
            _this[option] = value;
    }
    function getOption(option){
        return _this[option];
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
            slides.appendChild(image);
        }
        container.appendChild(slides);
    }
    //events
    function bindSwipe(left, right) {
        var started = false,
            touch;
        console.log(container);
        container.addEventListener("touchstart", swipeStart, false);
        container.addEventListener("touchmove", swipeContinue, false);
        container.addEventListener("touchend", swipeEnd, false);
        container.addEventListener("touchcancel", swipeEnd, false);
        container.addEventListener("touchleave", swipeEnd, false);

        container.addEventListener("click", swipeStart, false);
        function swipeStart(event) {
            if (started || event.touches.length != 1)
                return;

//            x =  event.changedTouches[0].pageX;
            started = true;
            touch = event.changedTouches[0];
            console.log('start');
        }
        function swipeContinue(event) {

            if(!started)
                return;

        }
        function swipeEnd(event) {
            started = false;
            console.log('end');
        }
    }

    //slide
    this.slideLeft = function() {

    }
    this.slideRight = function() {

    }
}