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
