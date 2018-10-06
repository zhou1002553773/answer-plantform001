<template>
  <div id="app">
    <web-header></web-header>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import webHeader from './components/common/header.vue'
import webFooter from './components/common/footer.vue'
export default {
  name: 'App',
  components: {
    webHeader,
    webFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
