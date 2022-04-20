//
// Did You Know Carousel
//

// make the first carousel is always active
document.getElementsByClassName('carousel-item')[0].classList.add('active');
let total =  document.getElementsByClassName('carousel-item').length;
let current = 0;

document.getElementById('moveRight').addEventListener('click', function() {
  let next = current;
  current = current + 1;
  setSlide(next, current);
});

document.getElementById('moveLeft').addEventListener('click', function() {
  let prev = current;
  current = current - 1;
  setSlide(prev, current);
});

function setSlide(prev, next) {
  let slide = current;
  if (next > total - 1) {
    slide = 0;
    current = 0;
  }

  if (next < 0) {
    slide = total - 1;
    current = total - 1;
  }

  document.getElementsByClassName('carousel-item')[prev].classList.remove('active');
  document.getElementsByClassName('carousel-item')[slide].classList.add('active');
};






//
// Scrolling Video Animation
//
const controller = new ScrollMagic.Controller();

// First Video - Protect Our Home
const videoContainer1 = document.getElementById("scrolling-vid-1");
const video1 = videoContainer1.querySelector("video");
const video1Text = videoContainer1.querySelector("h1");

let video1Scene = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: videoContainer1,
  triggerHook: 0
})
  .addIndicators() // for debugging
  .setPin(videoContainer1)
  .addTo(controller);

// Text Animation Scene
const video1TextAnimation = TweenMax.fromTo(video1Text, 4, { opacity: 1 }, { opacity: 0 });
let video1TextScene = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: videoContainer1,
  triggerHook: 0
})
  .setTween(video1TextAnimation)
  .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

video1Scene.on("progress", function (event) {
  // console.log("Scene progress changed to " + event.progress);
  scrollpos = video1.duration * event.progress;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  video1.currentTime = delay;
}, 33.3);




// Second Video - Don't Let This Happen 
const videoContainer2 = document.getElementById("scrolling-vid-2");
const video2 = videoContainer2.querySelector("video");
const video2Text = videoContainer2.querySelector("h1");


let video2Scene = new ScrollMagic.Scene({
  duration: 2250,
  triggerElement: videoContainer2,
  triggerHook: 0
})
  .addIndicators() // for debugging
  .setPin(videoContainer2)
  .addTo(controller);

// Text Animation Scene
const video2TextAnimation = TweenMax.fromTo(video2Text, 3, { opacity: 1 }, { opacity: 0 });
let video2TextScene = new ScrollMagic.Scene({
  duration: 2250,
  triggerElement: videoContainer2,
  triggerHook: 0
})
  .setTween(video2TextAnimation)
  .addTo(controller);

//Video Animation
let accelamount2 = 0.1;
let scrollpos2 = 0;
let delay2 = 0;

video2Scene.on("progress", function (event) {
  console.log("Scene progress changed to " + event.progress);
  scrollpos2 = video2.duration * event.progress;
});

setInterval(() => {
  delay2 += (scrollpos2 - delay2) * accelamount2;
  video2.currentTime = delay2;
}, 33.3);