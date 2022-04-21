const colors = {
  darkBlue: "#85CBCC",
  lightBlue: "#A8DEE0",
  paleOrange: "#F9E2AE",
  brightOrange: "#FBC78D",
  brightGreen: "#A7D676"
}

const myChart = document.getElementById('myChart').getContext('2d');

const barChart = new Chart(myChart, {
  type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels:['Wind', 'Hydropower', 'Solar', 'Biomass', 'Geothermal'],
    datasets:[{
      label:'Shares of total electricity production in 2021',
      data: [
        9.2,
        6.3,
        2.8,
        1.3,
        0.4
      ],
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
    legend: {
      display: false,
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
  }
});

