<template>
  <div class="container">
    <Header></Header>
    <div class="mb-5">
      <LineChart></LineChart>
    </div>
    <div class="mx-auto mb-5" style="max-width: 700px;">
      <RadarChart></RadarChart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import RadarChart from '@/components/RadarChart.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'Data',
  components: {
    LineChart,
    RadarChart,
    Header
  }
}
</script>

<style lang="scss">

</style>
