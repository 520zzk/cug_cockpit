<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
// import datav from './components/equipment/index.vue'

export default {
  name: 'app',
  components: {
    // datav
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
html, body {padding: 0;  margin: 0;  height: 100%;  overflow:hidden;}
</style>
