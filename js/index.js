// carousel

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
  setTimeout(function() {

  }, 800);



  console.log('current ' + current);
  console.log('prev ' + prev);
}





// scrolling video animation
const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
//END SECTION
const section = document.getElementById("testing123");
const end = section.querySelector("h1");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 9000,
  triggerElement: intro,
  triggerHook: 0
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Text Animation
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on("progress", function (event) {
  console.log("Scene progress changed to " + event.progress);
  scrollpos = video.duration * event.progress;
});

scene.on("update", e => {
  // console.log(e);
  // scrollpos = e.scrollPos / 1000;
  console.log(scrollpos);
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  // console.log(scrollpos, delay);

  video.currentTime = delay;
}, 33.3);
