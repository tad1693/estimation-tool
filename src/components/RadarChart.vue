<template>
  <div>
    <canvas id="myChart" width="200" height="200"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

const BGCORLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)'
]

const BORDERCOLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)'
]

const LABELS = ['Bug', 'Chore', 'Simple', 'Medium', 'Complex']
export default {
  name: 'RadarChart',
  mounted () {
    let vm = this
    var ctx = document.getElementById('myChart').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: LABELS,
        datasets: vm.getData()
      },
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 6,
            stepSize: 1
          }
        }
      }
    })
  },
  methods: {
    getData () {
      let vm = this
      let dataSets = []
      vm.$store.state.users.forEach((user, index) => {
        let result = vm.$store.getters.getRadarByUser(user.name)
        dataSets.push({
          label: user.name,
          data: result,
          backgroundColor: [BGCORLORS[index]],
          borderColor: [BORDERCOLORS[index]],
          borderWidth: 1
        })
      })
      return dataSets
    }
  }
}
</script>

<style scoped>

</style>
