/*
Did You Know Carousel
*/

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

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/*
Scrolling Video Animation
*/

const controller = new ScrollMagic.Controller();
const accelerationAmount = 0.1; // video accelerating to scroll

// First Video - Protect Our Home
const videoContainer1 = document.getElementById("scrolling-vid-1");
const video1 = videoContainer1.querySelector("video");
// prevent a bug where user could click on the video, which will start/pause the video (even with video controls removed)
// the video plays, so the video.currentTime increases, and it will not match correct proper scrollPosition calculated time
// ScrollMagic, in an attempt to correct the video.currentTime, will create a glitch affect, going back and forth by 0.1 second
video1.pause(); // set paused on default, 'autoplay' is needed in html for mobile devices that doesn't load video frames w/o being played (this video is technically always paused, only progressed through the use of video.currentTime)
video1.addEventListener("click", (event) => {
  event.preventDefault();
  video1.pause();
});

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
let video1ScrollPos = 0;
let video1Delay = 0;

video1Scene.on("progress", function (event) {
  // console.log("Scene progress changed to " + event.progress);
  video1ScrollPos = video1.duration * event.progress;
});

setInterval(() => {
  video1Delay += (video1ScrollPos - video1Delay) * accelerationAmount;
  video1.currentTime = video1Delay;
}, 33.3);


// Second Video - Don't Let This Happen 
const videoContainer2 = document.getElementById("scrolling-vid-2");
const video2 = videoContainer2.querySelector("video");
// prevent a bug where user could click on the video, which will start/pause the video (even with video controls removed)
// the video plays, so the video.currentTime increases, and it will not match correct proper scrollPosition calculated time
// ScrollMagic, in an attempt to correct the video.currentTime, will create a glitch affect, going back and forth by 0.1 second
video2.pause(); // set paused on default, 'autoplay' is needed in html for mobile devices that doesn't load video frames w/o being played (this video is technically always paused, only progressed through the use of video.currentTime)
video2.addEventListener("click", (event) => {
  event.preventDefault();
  video2.pause();
});
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
let accelerationAmount2 = 0.1;
let scrollpos2 = 0;
let delay2 = 0;

video2Scene.on("progress", function (event) {
  // console.log("Scene progress changed to " + event.progress);
  scrollpos2 = video2.duration * event.progress;
});

setInterval(() => {
  delay2 += (scrollpos2 - delay2) * accelerationAmount2;
  video2.currentTime = delay2;
}, 33.3);



