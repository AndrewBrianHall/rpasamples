<template>
  <div id="app">
    <Opportunities />
  </div>
</template>

<script>
import Opportunities from './components/Opportunities.vue'

export default {
  name: 'App',
  components: {
    Opportunities
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
