<template>
  <div id="app">
    <img alt="NicaSource logo" src="@/assets/logo.png" class="img-fluid d-block mx-auto" width="100">
    <div id="nav">
      <router-link to="/">Board</router-link> |
      <router-link to="/setting">Settings</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    text-align: center;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
