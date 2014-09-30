var TestTask = TestTask || {};

TestTask.Main = function()
{
    var settings = {
            images: [
                'http://tak-nada.com/images/slider/2v.jpg',
                'http://tak-nada.com/images/slider/3z.jpg',
                'http://tak-nada.com/images/slider/3v.jpg',
                'http://tak-nada.com/images/slider/4v.jpg',
                'http://tak-nada.com/images/slider/5t.jpg'
            ],
            mode: 'manual', // possible values: 'auto', 'manual', 'automanual'
            swipeSpeed: 800, // arbitrary interger (miliseconds)
            swipeDelay: 3000 // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
        },
        init = function() {
            var element = document.getElementById('slider');

//            return new SwipeSliderSlide(element, settings);
            return new SwipeSliderFade(element, settings);
//            return new SwipeSlider(element, settings);
        },
        oPublic = {
            init: init
        };
    return oPublic;
}();

window.onload = function() {
    TestTask.Main.init();

};