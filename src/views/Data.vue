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
        <dataCard icon="fa-check" name="completed on ETA" textClass="text-success" :value="getTotalCompletedOnETA"></dataCard>
      </div>
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-times" name="completed out of ETA" textClass="text-danger" :value="getTotalCompleteOutOfETA"></dataCard>
      </div>
      <div class="col-sm-12 col-md-4">
        <dataCard icon="fa-calendar-plus" name="created within ETA" text-class="text-info" :value="getTotalCreatedWithinSprint"></dataCard>
      </div>
    </div>
  </div>
</template>

<script>
import dataCard from '@/components/DataCard.vue'
import { mapState } from 'vuex'
import DateHandler from '../util/dateHandler'

const dateHandler = new DateHandler()
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
    }),
    getTotalFeatures () {
      return this.stories.filter(story => story.story_type.toLowerCase() === 'feature').length
    },
    getTotalBugs () {
      return this.stories.filter(story => story.story_type.toLowerCase() === 'bug').length
    },
    getTotalChores () {
      return this.stories.filter(story => story.story_type.toLowerCase() === 'chore').length
    },
    getTotalCompleteOutOfETA () {
      let count = 0
      this.stories.forEach(story => {
        if (story.hasOwnProperty('accepted_at') && dateHandler.isOutOfETA(this.sprint, story.accepted_at)) {
          count++
        }
      })
      return count
    },
    getTotalCompletedOnETA () {
      return this.stories.length - this.getTotalCompleteOutOfETA
    },
    getTotalCreatedWithinSprint () {
      let count = 0
      this.stories.forEach(story => {
        if (dateHandler.withinSprint(this.sprint, story.created_at)) {
          count++
        }
      })
      return count
    }
  }
}
</script>

<style lang="scss">

</style>
