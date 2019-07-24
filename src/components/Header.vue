<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        <h2>Sprint
          <q>{{sprint}}</q>
          <a class="small" data-toggle="modal" data-target="#sprintModalCenter" href="#sprintModalCenter"><i
            class="fas fa-edit"></i></a>
        </h2>
        <p>This sprint ends <b>{{ETA() | formatDate}}</b></p>
      </div>
      <div class="col-md-2 text-center ml-auto">
        <div class="d-flex justify-content-around ">
          <div class="">
            <dataCard icon="fa-star" name="Features" textClass="text-warning" :value="getTotalFeatures" :sm="true"
                      class="border-0"></dataCard>
          </div>
          <div class="">
            <dataCard icon="fa-bug" name="Bugs" textClass="text-danger" :value="getTotalBugs" :sm="true"
                      class="border-0"></dataCard>
          </div>
          <div class="">
            <dataCard icon="fa-cog" name="Chores" textClass="text-muted" :value="getTotalChores" :sm="true"
                      class="border-0"></dataCard>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <SprintModal :labels="labels"/>
  </div>
</template>

<script>
import dataCard from '@/components/DataCard.vue'
import SprintModal from '@/components/SprintModal.vue'
import DateHandler from '../util/dateHandler'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Header',
  components: {
    dataCard,
    SprintModal
  },
  watch: {
    'sprint' (value) {
      let vm = this
      vm.$store.dispatch('retrieveStories', value)
    }
  },
  mounted () {
    let vm = this
    if (!this.sprint) {
      vm.$store.dispatch('retrieveTags')
    }
  },
  computed: {
    ...mapState({
      sprint: state => state.client.sprint,
      labels: state => state.labels
    }),
    ...mapGetters([
      'getTotalFeatures',
      'getTotalBugs',
      'getTotalChores'
    ])
  },
  methods: {
    ETA () {
      if (this.sprint) return new DateHandler().getLastDayOfSprint(this.sprint)
    }
  }
}
</script>

<style scoped>

</style>
