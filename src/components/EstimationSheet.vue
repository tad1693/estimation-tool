<template>
  <div>
    <div class="container-fluid sprint">
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
      <div class="row pb-3">
        <div class="col-12" id="story-table">
          <!--    Stories table-->
          <div class="table-responsive">
            <table class="table table-striped table-bordered">
              <thead class="thead-dark">
              <tr>
                <th>#</th>
                <!--          <th>Module / Feature</th>-->
                <th>Task Description</th>
                <th>Type</th>
                <th>Member</th>
                <th>Day completed</th>
                <th>Weightage</th>
              </tr>
              </thead>
              <transition-group name="list" tag="tbody" mode="out-in">
                <tr v-for="(task, index) in getTasks" :key="index"
                    :class="onETA(task.accepted_at) ? 'bg-danger text-white': ''">
                  <td>{{++index}}</td>
                  <!--          <td></td>-->
                  <td class='story-description'>
                    <span class='ellipsis'>{{task.description}}</span>
                  </td>
                  <td>{{task.type}}</td>
                  <td>{{task.owner}}</td>
                  <td>{{task.accepted_at | formatDate}}</td>
                  <td>
                    {{getWeightageName(task.weightage)}}
                  </td>
                </tr>
              </transition-group>
            </table>
          </div>
        </div>
        <div class="col-12 text-center" id="story-kpi">
          <div class="row">
            <div class="py-1 col story-kpi-item">
              <dataCard icon="fa-check" name="Completed on ETA" textClass="text-success"
                        :value="getTotalCompletedOnETA"></dataCard>
            </div>
            <div class="py-1 col story-kpi-item">
              <dataCard icon="fa-times" name="Completed out of ETA" textClass="text-danger"
                        :value="getTotalCompleteOutOfETA" class="py-1"></dataCard>
            </div>
            <div class="py-1 col story-kpi-item">
              <dataCard icon="fa-calendar-plus" name="Created within ETA" text-class="text-info"
                        :value="getTotalCreatedWithinSprint" class="py-1"></dataCard>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <!--    Weightage table-->
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="thead-dark">
              <tr>
                <th></th>
                <th>Weightage</th>
                <th># of function points</th>
                <th>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>None</td>
                <td>1</td>
                <td>{{getTaskNoneCount | twoDecimals}}</td>
                <td>{{getTotalTaskNoneCount | twoDecimals}}</td>
              </tr>
              <tr>
                <td>Simple</td>
                <td>2</td>
                <td>{{getTaskSimpleCount | twoDecimals}}</td>
                <td>{{getTotalTaskSimpleCount | twoDecimals}}</td>
              </tr>
              <tr>
                <td>Medium</td>
                <td>3</td>
                <td>{{getTaskMediumCount | twoDecimals}}</td>
                <td>{{getTotalTaskMediumCount | twoDecimals}}</td>
              </tr>
              <tr>
                <td>Complex</td>
                <td>5</td>
                <td>{{getTaskComplexCount | twoDecimals}}</td>
                <td>{{getTotalTaskComplexCount | twoDecimals}}</td>
              </tr>
              <tr>
                <td colspan="3">Function Total Points</td>
                <td>{{getFunctionTotalPoints | twoDecimals}}</td>
              </tr>
              <tr>
                <td colspan="3">Estimate define per point</td>
                <td>{{estimatedDefined | twoDecimals}}</td>
              </tr>
              <tr>
                <td colspan="3">Total Estimated Effort (Person Hours)</td>
                <td>{{getTotalEstimatedEffort | twoDecimals}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-lg-6">
          <!--    Estimation table-->
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="thead-dark">
              <tr>
                <th colspan=2>Estimation</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Best-case estimate</td>
                <td>{{getBestCaseEstimate | twoDecimals}}</td>
              </tr>
              <tr>
                <td>Most likely estimate</td>
                <td>{{getTotalEstimatedEffort | twoDecimals}}</td>
              </tr>
              <tr>
                <td>Worst case estimate</td>
                <td>{{getWorstCaseEstimate | twoDecimals}}</td>
              </tr>
              <tr>
                <td>Estimation</td>
                <td>{{getEstimation | twoDecimals}}</td>
              </tr>
              <tr>
                <td>Standard Deviation</td>
                <td>{{getSD | twoDecimals}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="sprint-result">
      <div class="container-fluid">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="thead-dark">
            <tr>
              <th>Result</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="bg-warning">To complete this sprint it is needed {{getEstimation | twoDecimals}} &plusmn;
                {{getSD | twoDecimals}} man-hour ({{(getEstimation - getSD) | twoDecimals}} to {{(getEstimation +
                getSD) | twoDecimals}} man-hour)
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <SprintModal :labels="labels"/>
    <div v-if="loading">
      <loader></loader>
    </div>
    <div class="position-fixed time-indicator">
      <TimeIndicator></TimeIndicator>
    </div>
  </div>
</template>

<script>
import dataCard from '@/components/DataCard.vue'
import { mapGetters, mapState } from 'vuex'
import SprintModal from '@/components/SprintModal.vue'
import TimeIndicator from '@/components/TimeIndicator.vue'
import DateHandler from '../util/dateHandler'

export default {
  name: 'EstimationSheet',
  components: {
    SprintModal,
    dataCard,
    TimeIndicator
  },
  data () {
    return {
      estimatedDefined: 5
    }
  },
  watch: {
    'sprint' (value) {
      this.$store.dispatch('retrieveStories', value).then(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.$store.dispatch('retrieveStories', this.sprint).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapState({
      sprint: state => state.client.sprint,
      stories: state => state.stories,
      users: state => state.users,
      labels: state => state.labels
    }),
    ...mapGetters([
      'getTotalFeatures',
      'getTotalBugs',
      'getTotalChores',
      'getTotalCompletedOnETA',
      'getTotalCompleteOutOfETA',
      'getTotalCreatedWithinSprint'
    ]),
    getTasks () {
      return this.$store.getters.getFilteredStories
    },
    getTaskNoneCount () {
      return this.getTasks.filter(task => task.weightage === 0).length
    },
    getTaskSimpleCount () {
      return this.getTasks.filter(task => task.weightage === 1).length
    },
    getTaskMediumCount () {
      return this.getTasks.filter(task => task.weightage === 2).length
    },
    getTaskComplexCount () {
      return this.getTasks.filter(task => task.weightage === 3).length
    },
    getTotalTaskNoneCount () {
      return this.getTaskNoneCount * 1
    },
    getTotalTaskSimpleCount () {
      return this.getTaskSimpleCount * this.$store.getters.getClient.simple
    },
    getTotalTaskMediumCount () {
      return this.getTaskMediumCount * this.$store.getters.getClient.medium
    },
    getTotalTaskComplexCount () {
      return this.getTaskComplexCount * this.$store.getters.getClient.complex
    },
    getFunctionTotalPoints () {
      return this.getTotalTaskNoneCount + this.getTotalTaskSimpleCount + this.getTotalTaskMediumCount + this.getTotalTaskComplexCount
    },
    getTotalEstimatedEffort () {
      return this.getFunctionTotalPoints * this.estimatedDefined
    },
    getBestCaseEstimate () {
      return this.getTotalEstimatedEffort * 0.7
    },
    getWorstCaseEstimate () {
      return this.getTotalEstimatedEffort * 1.2
    },
    getEstimation () {
      return (this.getBestCaseEstimate + 4 * this.getTotalEstimatedEffort + this.getWorstCaseEstimate) / 6
    },
    getSD () {
      return (this.getWorstCaseEstimate - this.getBestCaseEstimate) / 6
    }
  },
  methods: {
    getWeightageName (weightage) {
      let name = 'None'
      switch (weightage) {
        case 1:
          name = 'Simple'
          break
        case 2:
          name = 'Medium'
          break
        case 3:
          name = 'Complex'
          break
      }
      return name
    },
    onETA (acceptedTime) {
      return new DateHandler().isOutOfETA(this.sprint, acceptedTime)
    },
    ETA () {
      return new DateHandler().getLastDayOfSprint(this.sprint)
    }
  }
}
</script>

<style lang="scss">
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 300px;
    display: block;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active, .list-leave-active {
    transition: all ease-out 1s;
  }

  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateX(30px);
  }

  .time-indicator {
    right: 5px;
    bottom: 5px;
    background-color: $dark;
    padding: 10px;
    box-shadow: $box-shadow;
  }
</style>
