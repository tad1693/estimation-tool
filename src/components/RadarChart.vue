<template>
  <div>
    <h6 class="heading">Stories distribution</h6>
    <canvas id="myChart" width="200" height="200"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapGetters } from 'vuex'

const BGCORLORS = [
  'rgba(66, 133, 244, 0.5)',
  'rgba(219, 68, 55, 0.5)',
  'rgba(244, 180, 0, 0.5)',
  'rgba(15, 157, 88, 0.5)',
  'rgba(171, 71, 188, 0.5)',
  'rgba(0, 172, 193, 0.5)',
  'rgba(255, 112, 67, 0.5)'
]

const BORDERCOLORS = [
  'rgb(66, 133, 244)',
  'rgb(219, 68, 55)',
  'rgb(244, 180, 0)',
  'rgb(15, 157, 88)',
  'rgb(171, 71, 188)',
  'rgb(0, 172, 193)',
  'rgb(255, 112, 67)'
]

const LABELS = ['Bug', 'Chore', 'Simple', 'Medium', 'Complex']
export default {
  name: 'RadarChart',
  watch: {
    'getFilteredStories' () {
      this.drawChart()
    }
  },
  mounted () {
    let vm = this
    vm.drawChart()
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
          borderWidth: 2
        })
      })
      return dataSets
    },
    drawChart () {
      var ctx = document.getElementById('myChart').getContext('2d')
      let vm = this
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
              stepSize: 1
            }
          }
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getFilteredStories'])
  }
}
</script>

<style scoped lang="scss">
  .heading {
    color: rgb(117, 117, 117);
    font-weight: $font-weight-normal;
  }
</style>
