<template>
  <div>
    <div :class="[getIndicatorColor, 'indicator mx-auto']">
      {{getTotalSprintTime}} days
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TimeIndicator',
  computed: {
    ...mapGetters(['getTotalSprintTime']),
    getIndicatorColor () {
      if (this.getTotalSprintTime < 5) {
        return 'border-success'
      } else if (this.getTotalSprintTime === 5) {
        return 'border-warning'
      } else {
        return 'border-danger'
      }
    }
  }
}
</script>

<style lang="scss">
  .indicator {
    border: 10px solid #3498db;
    border-radius: 50%;
    border-bottom: 10px solid #f3f3f3 !important;
    width: 100px;
    height: 100px;
    text-align: center;
    vertical-align: middle;
    padding-top: 28px;
    color: $white;
    /*<!--font-weight: $font-weight-bold;-->*/
  }
  .border {
    &-sucess {
      border-color: $success;
    }
    &-danger {
      border-color: $danger;
    }
    &-warning {
      border-color: $warning;
    }
  }
</style>
