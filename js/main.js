var TestTask = TestTask || {};

TestTask.Main = function()
{
    var settings = {
            images: [
                'http://tak-nada.com/images/slider/2m.jpg',
                'http://tak-nada.com/images/slider/1m.jpg',
                'http://tak-nada.com/images/slider/1o.jpg',
                'http://tak-nada.com/images/slider/5t.jpg',
                'http://tak-nada.com/images/slider/4i.jpg'
            ],
            mode: 'automanual', // possible values: 'auto', 'manual', 'automanual'
            swipeSpeed: 800, // arbitrary interger (miliseconds)
            swipeDelay: 3000 // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
        },
        init = function() {
            console.log('init()');
            var element = document.getElementById('slider');
            return new SwipeSlider(element, settings);
        },
        oPublic = {
            init: init
        };
    return oPublic;
}();

window.onload = function() {
    TestTask.Main.init();

};