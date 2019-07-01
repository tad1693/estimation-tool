<template>
  <div class="home">
    <EstimationSheet/>
  </div>
</template>

<script>
// @ is an alias to /src
import EstimationSheet from '@/components/EstimationSheet.vue'

export default {
  name: 'home',
  components: {
    EstimationSheet
  }
}
</script>
