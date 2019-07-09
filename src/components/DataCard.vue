<template>
  <div class="card">
    <div :class="[{'p-0': sm},'card-body']">
      <p :class="[sm ? 'm-0 h3' : 'h1', textClass]"><i :class="['fas', icon]"></i></p>
      <p :class="{'m-0 small': sm}">{{value}}</p>
      <p class="h3" v-if="!sm">{{name}}</p>
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
    },
    sm: {
      type: Boolean,
      default: false
    }
  }
}
</script>
