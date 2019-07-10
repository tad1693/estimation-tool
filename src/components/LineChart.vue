<template>
  <div id="chart"></div>
</template>

<script>
import { mapGetters } from 'vuex'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export default {
  name: 'LineChart',
  watch: {
    'getFilteredStories' () {
      this.drawChart()
    }
  },
  mounted () {
    let vm = this
    google.charts.load('current', { packages: ['line'] })
    google.charts.setOnLoadCallback(vm.drawChart)
  },
  methods: {
    addUsers (data) {
      data.addColumn('string', 'Day')
      this.$store.state.users.forEach(user => {
        data.addColumn('number', user.name)
      })
    },
    addRows (data) {
      let vm = this
      let rows = []
      DAYS.forEach(day => {
        let stories = vm.$store.getters.getChartRowByDate(day)
        let row = [day]
        vm.$store.state.users.forEach(user => {
          if (stories.hasOwnProperty(user.name)) {
            row.push(stories[user.name])
          }
        })
        rows.push(row)
      })
      data.addRows(rows)
    },
    drawChart () {
      let vm = this
      // Define the chart to be drawn.
      var data = new google.visualization.DataTable()
      vm.addUsers(data)
      vm.addRows(data)

      var options = {
        chart: {
          title: `Weekly Sprint '${vm.$store.state.client.sprint}'`,
          subtitle: 'Stories\' Completion by days'
        },
        width: 700,
        height: 500,
        axes: {
          x: {
            0: { side: 'bottom' }
          }
        },
        selectionMode: 'multiple',
        // Trigger tooltips
        // on selections.
        tooltip: { trigger: 'selection' },
        // Group selections
        // by x-value.
        aggregationTarget: 'category',
        animation: {
          duration: 1000,
          ease: 'out'
        }
      }

      // Instantiate and draw the chart.
      var chart = new google.charts.Line(document.getElementById('chart'))
      // Disabling the button while the chart is drawing.
      chart.draw(data, google.charts.Line.convertOptions(options))
    }
  },
  computed: {
    ...mapGetters(['getFilteredStories'])
  }
}
</script>

<style>

  #chart > div {
    margin: 0 auto;
  }
</style>
