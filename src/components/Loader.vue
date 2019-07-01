<template>
  <div class="d-flex justify-content-center align-items-center loader-box" id="loader">
    <div class="position-relative d-flex loader-container">
      <div class="loader-element center-element"></div>
      <div class="align-self-center text-center flex-fill animate-text text-white">Loading</div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Loader',
  mounted () {
    $('body').addClass('modal-open')
  },
  destroyed () {
    $('body').removeClass('modal-open')
  }
}
</script>

<style lang="scss">
  .loader {
    &-container {
      width: 120px;
      height: 120px;
      position: absolute;
    }
    &-box {
      background: rgba($app-bg, 0.8);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      z-index: 9999;
      border-radius: $card-border-radius;
      overflow-x: hidden;
      overflow-y: auto;
    }
    &-element {
      border: 8px solid #f2f2f2;
      border-radius: 50%;
      border-top: 8px solid $primary;
      width: 120px;
      height: 120px;
      animation: spin .5s linear infinite;
    }
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .center-element {
    position: absolute;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
  }

  .animate-text {
    -webkit-animation: resize 4s linear infinite; /* Safari */
    animation: resize 4s linear infinite;
    font-size: 8px;
  }

  /* Safari */
  @-webkit-keyframes resize {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(2, 2);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes resize {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(2, 2);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
