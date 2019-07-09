<template>
  <div class="modal fade" id="sprintModalCenter" tabindex="-1" role="dialog" aria-labelledby="sprintModalLongTitle"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sprintModalLongTitle">Sprint Modal</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="sprintForm" @submit.prevent="saveSprint">
            <div class="form-group">
              <label for="sprint">Select the sprint:</label>
              <select name="sprint" id="sprint" v-model="target" class="form-control">
                <option :value="sprint.name" :selected="(sprint.name === current)" v-for="(sprint, index) in sprints"
                        :key="index">{{sprint.name}}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" form="sprintForm" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'SprintModal',
  props: {
    'labels': {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      target: this.$store.state.client.sprint
    }
  },
  methods: {
    saveSprint () {
      this.$store.commit('SET_SPRINT', this.target)
      $('#sprintModalCenter').modal('hide')
    }
  },
  computed: {
    ...mapState({
      current: state => state.client.sprint
    }),
    sprints () {
      return this.$store.getters.getWeeklyTags
    }
  }
}
</script>
