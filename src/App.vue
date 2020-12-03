<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import './assets/styles/main.scss';

#app {
  width: 100%;
  height: 100%;
}
.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>
