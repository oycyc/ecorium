document.addEventListener("DOMContentLoaded", function (event) {
  var controller = new ScrollMagic.Controller();

  var horizontalSlide = new TimelineMax()
    // animate panels
    .to("#js-slideContainer", 1, { x: "-20%" })
    .to("#js-slideContainer", 1, { x: "-40%" })
    .to("#js-slideContainer", 1, { x: "-60%" })
    .to("#js-slideContainer", 1, { x: "-80%" });

  // create scene to pin and link animation
  new ScrollMagic.Scene({
    triggerElement: "#js-wrapper",
    triggerHook: "onLeave",
    duration: "800%",
  })
    .setPin("#js-wrapper")
    .setTween(horizontalSlide)
    .addTo(controller);
});


// food carousel
const items = document.querySelectorAll('.slider-item');
const itemCount = items.length;
const nextItem = document.querySelector('.next');
const previousItem = document.querySelector('.previous');
let count = 0;

function showNextItem() {
  items[count].classList.remove('active');

  if(count < itemCount - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active');
}

function showPreviousItem() {
  items[count].classList.remove('active');

  if(count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }

  items[count].classList.add('active');
}

function keyPress(e) {
  e = e || window.event;
  
  if (e.keyCode == '37') {
    showPreviousItem();
  } else if (e.keyCode == '39') {
    showNextItem();
  }
}

nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);
document.addEventListener('keydown', keyPress);