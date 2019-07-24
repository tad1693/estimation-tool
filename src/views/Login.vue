<template>
  <div class="login container">
    <h1 class="text-center">Welcome to NicaSource Estimation Tool</h1>
    <form @submit.prevent="login" class="w-25 mx-auto">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <div class="form-group text-right">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseHandler from '@/util/firebaseHandler.js'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let path = this.$route.query.redirect
      let response = firebaseHandler.signInFirebase(this.email, this.password)
      if (response) this.$router.push(path)
    }
  }
}
</script>

<style scoped>

</style>
