const colors = {
  darkBlue: "#85CBCC",
  lightBlue: "#A8DEE0",
  paleOrange: "#F9E2AE",
  brightOrange: "#FBC78D",
  brightGreen: "#A7D676"
}

//avatars on top of bars
//one for each bar
const img1 = new Image();
img1.src = './favicon.png'
const img2 = new Image();
img2.src = './favicon.png'
const img3 = new Image();
img3.src = './renewable.png'
const img4 = new Image();
img4.src = './favicon.png'
const img5 = new Image();
img5.src = './treebg.jpg'

const myChart = document.getElementById('myChart').getContext('2d');

//barAvatar Plugin Block
const dataPoints = [9.2, 6.3, 2.8, 1.3, 0.4];
const avatarArray = [img1, img2, img3, img4, img5];

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
    labels:['Wind', 'Hydropower', 'Solar', 'Biomass', 'Geothermal'],
    datasets:[{
      label:'Shares of total electricity production in 2021',
      data: dataPoints,
      backgroundColor: [
        colors.lightBlue,
        colors.darkBlue,
        colors.brightOrange,
        colors.brightGreen,
        colors.paleOrange
      ],
      borderWidth:1,
      borderColor: '#333',
    }]
  },
  options:{
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
        }
      }
    },
  },
  plugins: [barAvatar]
});

