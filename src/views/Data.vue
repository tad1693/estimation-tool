<template>
  <div class="text-center container">
    <!--    Stories resume-->
    <h2>Stories Summary</h2>
    <div class="row py-4">
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-star" name="Features" textClass="text-warning" :value="getTotalFeatures"></dataCard>
      </div>
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-bug" name="Bugs" textClass="text-danger" :value="getTotalBugs"></dataCard>
      </div>
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-cog" name="Chores" textClass="text-muted" :value="getTotalChores"></dataCard>
      </div>
    </div>
    <!--    Sprint resume-->
    <h2>Sprint Summary <span class="small">(# of Stories)</span></h2>
    <div class="row py-4">
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-check" name="completed on ETA" textClass="text-success"
                  :value="getTotalCompletedOnETA"></dataCard>
      </div>
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-times" name="completed out of ETA" textClass="text-danger"
                  :value="getTotalCompleteOutOfETA"></dataCard>
      </div>
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-calendar-plus" name="created within ETA" text-class="text-info"
                  :value="getTotalCreatedWithinSprint"></dataCard>
      </div>
    </div>
  </div>
</template>

<script>
import dataCard from '@/components/DataCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'Data',
  components: {
    dataCard
  },
  created () {
  },
  computed: {
    ...mapState({
      sprint: state => state.client.sprint,
      stories: state => state.stories
    })

  }
}
</script>

<style lang="scss">

</style>
