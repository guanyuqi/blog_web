<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>
<script>
import Header from './components/Header'
export default {
  components: {
    Header
  }
}
</script>
<style lang="scss">
/* html {
  overflow-y: scroll;
} */
html,
body,
#app {
  /* height: 100%; */
  margin: 0;
  padding: 0;
  position: relative;
  background-color: #f4f4f4;
}
a {
  text-decoration: none;
}
#app {
  background-color: #f4f4f4;
}
</style>
