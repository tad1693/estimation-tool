<template>
  <div class="card">
    <div class="card-body">
      <p :class="[textClass, 'h1']"><i :class="['fas', icon]"></i></p>
      <p>{{value}}</p>
      <h3>{{name}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    textClass: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
