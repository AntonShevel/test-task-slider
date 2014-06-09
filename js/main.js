window.onload = function() {
    init();
};

function init() {
    var el = document.getElementsByTagName("body")[0];
    el.addEventListener("touchstart", handleEvent, false);
    el.addEventListener("touchend", handleEvent, false);
    el.addEventListener("touchcancel", handleEvent, false);
    el.addEventListener("touchleave", handleEvent, false);
    el.addEventListener("touchmove", handleEvent, false);
    el.addEventListener("click", handleEvent, false);
    console.log("initialized.");
}

function handleEvent(event) {
    document.getElementById('foo').innerHTML += event.type+'; ';
    console.log(event);
}

function initSlider() {

    var element = document.getElementById('slider'),
        settings = {
            images: [
                'http://tak-nada.com/images/slider/1m.jpg',
                'http://tak-nada.com/images/slider/2m.jpg',
                'http://tak-nada.com/images/slider/1o.jpg',
                'http://tak-nada.com/images/slider/5t.jpg',
                'http://tak-nada.com/images/slider/4i.jpg'
            ],
            mode: 'auto', // possible values: 'auto', 'manual', 'automanual'
            swipeSpeed: 500, // arbitrary interger (miliseconds)
            swipeDelay: 3000 // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
        },
        slider = new SwipeSlider(element, settings);
}