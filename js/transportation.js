const colors = {
  darkBlue: "#85CBCC",
  lightBlue: "#A8DEE0",
  paleOrange: "#F9E2AE",
  brightOrange: "#FBC78D",
  brightGreen: "#A7D676"
}

Chart.defaults.font.family = "'Josefin Sans', sans-serif"

//avatars on top of bars
//one for each bar
//gets the src from the html file because it makes the chart from there
const wind = new Image();
wind.src = './assets/tpt-imgs/wind-turbine.png'
const hydropower = new Image();
hydropower.src = './assets/tpt-imgs/hydro-power.png'
const solar = new Image();
solar.src = './assets/tpt-imgs/solar.png'
const biomass = new Image();
biomass.src = './assets/tpt-imgs/biomass.png'
const geothermal = new Image();
geothermal.src = './assets/tpt-imgs/geothermal-energy.png'

const myChart = document.getElementById('myChart').getContext('2d');

//barAvatar Plugin Block
const dataPoints = [0.4, 1.3, 2.8, 6.3, 9.2];
const avatarArray = [geothermal, biomass, solar, hydropower, wind];


const barAvatar = {
  id: 'barAvatar',
  afterDatasetDraw(chart, args, options) {
    const { ctx, chartArea: {top, bottom, left, right, width, height},
      scales: {x, y}} = chart;
    ctx.save();

    /*iterate through the five sections and replace with each respective image*/
    for (let i = 0; i < dataPoints.length; i++) {
      ctx.drawImage(avatarArray[i], x.getPixelForValue(i) - 15, y.getPixelForValue(dataPoints[i]) - 30, 30, 30);
    }

  }
}

const barChart = new Chart(myChart, {
  type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels:['Geothermal', 'Biomass', 'Solar', 'Hydropower', 'Wind'],
    datasets:[{
      label:'Shares of total electricity production in 2021',
      data: dataPoints,
      backgroundColor: [
        colors.paleOrange,
        colors.brightGreen,
        colors.brightOrange,
        colors.darkBlue,
        colors.lightBlue
      ],
      borderWidth:1,
      borderColor: '#333',
    }]
  },
  options:{
    maintainAspectRatio: false,
    layout: {
      padding: 30
    },
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value + "%";
          }
        },
        grid: {
          display: false
        },
      },
      x: {
        grid: {
        display: false
        }
      },
    },
  },
  plugins: [barAvatar]
});



/*function to make menus appear full screen*/

$('img[data-enlargeable]').addClass('img-enlargeable').click(function() {
  var src = $(this).attr('src');
  var modal;

  function removeModal() {
    modal.remove();
    $('body').off('keyup.modal-close');
  }

  modal = $('<div>').css({ /*modal with menu picture and styling*/
    background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: '10000',
    top: '0',
    left: '0',
    cursor: 'zoom-out'
  }).click(function() {
    removeModal();
  }).appendTo('body');

  //handling ESC
  $('body').on('keyup.modal-close', function(e) {
    if (e.key === 'Escape') {
      removeModal();
    }
  });
});


/*GAME GUZZZ*/
const c = document.querySelector('#console')
const ss = document.querySelector('#start_screen')
const gv = document.querySelector('#game_vehicle')
const sn = document.querySelector('#speed_needle')
var root = document.documentElement
var bg = 0

function countdown(){
  var num = 1
  var fuel = 1000
  var time = 0  
  var run;
  var play;
  var cdb = document.querySelector('#countdown_box')
  var text = document.querySelector('#countdown_text')
  var secs = 3

function addNumber() {
    // handle mpg meter
    if(run) {
      num++
      if(num < 181) {
        root.style.setProperty('--speed', 'rotate('+num+'deg)')  
      } else {
        num = 180
      }

    } else {
      num--
      if(num > 0) {
        root.style.setProperty('--speed', 'rotate('+num+'deg)')  
      } else {
        num = 0
      }
    }  

    // handle fuel meter
    if(num > 75 && num < 105) {
      fuel = fuel
    } else {
      fuel = fuel - 3
    }
    if(fuel > 0) {
      ss.style.display = 'none'
      var fperc = fuel / 1000 * 100
      // console.log(num + ' / ' + fuel)
      root.style.setProperty('--fuel', 'rotate('+fperc+'deg)')
    } else {
      run = false
    }

    if(num > 0){
      gv.classList.add('bounce')
      time = time + num
      document.querySelector('#travel_dist').innerHTML = time / 10000  + '<span>miles</span>'
      bg = bg + (num*.25)
      c.style.backgroundPosition = '50% '+bg+'px'
    } else {
      gv.classList.remove('bounce')
    }

    if(fuel <= 0 && num <= 0) {      
      ss.style.display = 'block'
      if(!localStorage.getItem('gas_guzzler')){
        localStorage.setItem('gas_guzzler', time / 10000)
      } else {
        if(time / 10000 > localStorage.getItem('gas_guzzler')) {
          localStorage.setItem('gas_guzzler', time / 10000)
        }
      }      
    } else {
      setTimeout(addNumber, 1000/30)
    }
  }

  text.innerHTML = '3'
  root.style.setProperty('--carDisplay', 'block');
  cdb.classList.add('countdown_pulse')
  setTimeout(function(){
    secs--
    text.innerHTML = secs
  },1000)
  setTimeout(function(){
    secs--
    text.innerHTML = secs
  },2000)
  setTimeout(function(){
    secs--
    text.innerHTML = 'GO!'
    addNumber()
    },3000)  
  setTimeout(function(){
    root.style.setProperty('--carDisplay', 'none');    
  },4000)

  c.addEventListener('mousedown', function(){
    run = true   
  })
  c.addEventListener('mouseup', function(){
    run = false 
  })
  c.addEventListener('touchstart', function(){
    run = true
  })
  c.addEventListener('touchend', function(){
    run = false
  })  

  ss.style.display = 'none'
}

ss.addEventListener('click', countdown)