let myChart = document.getElementById('myChart').getContext('2d');

let barChart = new Chart(myChart, {
  type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels:['Wind', 'Hydropower', 'Solar', 'Biomass', 'Geothermal'],
    datasets:[{
      label:'Nonrenewable Sources',
      data: [
        9.2,
        6.3,
        2.8,
        1.3,
        0.4
      ]
    }]
  },
  options:{}
});

