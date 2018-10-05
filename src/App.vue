<template>
  <div id="app">
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  padding-top: 70px;
  background-color: #f5f5f5 !important;
}
.slide-enter-active {
  animation: slide-in 0.25s ease-in forwards;
}
.slide-leave-active {
  animation: slide-out 0.25s ease-in forwards;
}
@keyframes slide-in {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1
  }
  to {
    opacity: 0;
    transform: translateX(50px);
  }
}

</style>
