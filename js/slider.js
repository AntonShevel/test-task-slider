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
    this.container = container;
    setOptions(options);

    function setOption(option, value) {
        if (this[option] != undefined)
            this[option] = value;
    }
    function setOptions(options) {
        for (var key in options) {
            setOption(key, options[key]);
        }
    }
}