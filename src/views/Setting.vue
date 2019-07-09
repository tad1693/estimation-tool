<template>
  <div class="container">
    <h2>Settings</h2>
    <hr>
    <h3 class="text-center d-none">Client</h3>
    <form @submit.prevent="saveClient">
      <div class="form-group">
        <label for="client">Client:</label>
        <input type="text" class="form-control" id="client" v-model="target.name">
      </div>
      <div class="form-group">
        <label for="projectID">Project ID:</label>
        <input type="text" id="projectID" class="form-control" v-model="target.projectID">
      </div>
      <div class="form-group">
        <label for="PTToken">Pivotal Token:</label>
        <input type="text" id="PTToken" class="form-control" v-model="target.pivotalToken">
      </div>
      <div class="form-row">
        <div class="col-sm-4 form-group">
          <label for="simple">Simple:</label>
          <input type="number" id="simple" class="form-control" v-model.number="target.simple">
        </div>
        <div class="col-sm-4 form-group">
          <label for="medium">Medium:</label>
          <input type="number" id="medium" class="form-control" v-model.number="target.medium">
        </div>
        <div class="col-sm-4 form-group">
          <label for="complex">Complex:</label>
          <input type="number" id="complex" class="form-control" v-model.number="target.complex">
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Save</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Setting',
  data () {
    return {
      target: {
        name: '',
        projectID: '',
        pivotalToken: '',
        simple: 1,
        medium: 2,
        complex: 3
      }
    }
  },
  beforeMount () {
    this.target = this.$store.getters.getClient
  },
  methods: {
    saveClient () {
      this.$store.commit('SET_CLIENT', this.target)
    }
  }
}
</script>
