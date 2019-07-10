<template>
  <div class="container">
    <div class="mb-5">
      <LineChart></LineChart>
    </div>
    <div class="mx-auto mb-5" style="max-width: 700px;">
      <h6 class="text-muted">Stories distribution</h6>
      <RadarChart></RadarChart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import RadarChart from '@/components/RadarChart.vue'
export default {
  name: 'Data',
  components: {
    LineChart,
    RadarChart
  }
}
</script>

<style lang="scss">

</style>
