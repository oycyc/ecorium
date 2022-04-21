// clean this up

import * as PIXI from "https://cdn.skypack.dev/pixi.js";
import { KawaseBlurFilter } from "https://cdn.skypack.dev/@pixi/filter-kawase-blur";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise";
import hsl from "https://cdn.skypack.dev/hsl-to-hex";
import debounce from "https://cdn.skypack.dev/debounce";

// return a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// map a number from 1 range to another
function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

const simplex = new SimplexNoise();

class ColorPalette {
  constructor() {
    this.setColors();
    this.setCustomProperties();
  }

  setColors() {
    this.hue = 89;
    this.complimentaryHue1 = this.hue + 30; // 30 degs away from base
    this.complimentaryHue2 = this.hue + 60; // 60 degs away from base
    this.saturation = 95;
    this.lightness = 50;

    this.baseColor = hsl(this.hue, this.saturation, this.lightness);
    this.complimentaryColor1 = hsl(this.complimentaryHue1,this.saturation,this.lightness);
    this.complimentaryColor2 = hsl(this.complimentaryHue2,this.saturation,this.lightness);

    // store the color choices in an array so that a random one can be picked later
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2
    ];
  }

  randomColor() {
    return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
      "#",
      "0x"
    );
  }

  setCustomProperties() {
    // set CSS custom properties so that the colors defined here can be used throughout the UI
    document.documentElement.style.setProperty("--hue", this.hue);
    document.documentElement.style.setProperty(
      "--hue-complimentary1",
      this.complimentaryHue1
    );
    document.documentElement.style.setProperty(
      "--hue-complimentary2",
      this.complimentaryHue2
    );
  }
}

// Orb class
class Orb {
  // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
  constructor(fill = 0x000000) {
    // bounds = the area an orb is "allowed" to move within
    this.bounds = this.setBounds();
    // initialise the orb's { x, y } values to a random point within it's bounds
    this.x = random(this.bounds["x"].min, this.bounds["x"].max);
    this.y = random(this.bounds["y"].min, this.bounds["y"].max);

    // how large the orb is vs it's original radius (this will modulate over time)
    this.scale = 1;

    // what color is the orb?
    this.fill = fill;

    // the original radius of the orb, set relative to window height
    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

    // starting points in "time" for the noise/self similar random values
    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);
    // how quickly the noise/self similar random values step through time
    this.inc = 0.002;

    // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.825;

    // 250ms after the last window resize event, recalculate orb positions.
    window.addEventListener(
      "resize",
      debounce(() => {
        this.bounds = this.setBounds();
      }, 250)
    );
  }

  setBounds() {
    // how far from the { x, y } origin can each orb move
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
    // the { x, y } origin for each orb (the bottom right of the screen)
    const originX = window.innerWidth / 1.25;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.375;

    // allow each orb to move x distance away from it's x / y origin
    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist
      }
    };
  }

  update() {
    // self similar "psuedo-random" or noise values at a given point in "time"
    const xNoise = simplex.noise2D(this.xOff, this.xOff);
    const yNoise = simplex.noise2D(this.yOff, this.yOff);
    const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

    // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
    // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    // step through "time"
    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    // update the PIXI.Graphics position and scale values
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    // clear anything currently drawn to graphics
    this.graphics.clear();

    // tell graphics to fill any shapes drawn after this with the orb's fill color
    this.graphics.beginFill(this.fill);
    // draw a circle at { 0, 0 } with it's size set by this.radius
    this.graphics.drawCircle(0, 0, this.radius);
    // let graphics know we won't be filling in any more shapes
    this.graphics.endFill();
  }
}

// Create PixiJS app
const app = new PIXI.Application({
  // render to <canvas class="orb-canvas"></canvas>
  view: document.querySelector(".orb-canvas"),
  // auto adjust size to fit the current window
  resizeTo: window,
  // transparent background, we will be creating a gradient background later using CSS
  transparent: true
});


const colorPalette = new ColorPalette();
app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

// Create orbs
const orbs = [];

for (let i = 0; i < 10; i++) {
  const orb = new Orb(colorPalette.randomColor());

  app.stage.addChild(orb.graphics);

  orbs.push(orb);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  app.ticker.add(() => {
    orbs.forEach((orb) => {
      orb.update();
      orb.render();
    });
  });
} else {
  orbs.forEach((orb) => {
    orb.update();
    orb.render();
  });
}



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
  console.log("Scene progress changed to " + event.progress);
  scrollpos2 = video2.duration * event.progress;
});

setInterval(() => {
  delay2 += (scrollpos2 - delay2) * accelerationAmount2;
  video2.currentTime = delay2;
}, 33.3);



