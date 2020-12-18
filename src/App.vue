<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <BackToTop></BackToTop>
  </div>
</template>
<script>
import Header from './components/Header'
import BackToTop from './components/BackToTop'
export default {
  components: {
    Header,
    BackToTop
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.$store.dispatch('setUserInfo', userInfo)
  }
}
</script>
<style lang="scss">
html {
  overflow-y: scroll;
}
html,
body,
#app {
  /* height: 100%; */

  position: relative;
  background-color: #f4f4f4;
}
a {
  text-decoration: none;
}
* {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
