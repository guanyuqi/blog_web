<template>
  <div class="home">
    <div class="momentList">
      <router-link to="/editor">
        <h2>编辑器</h2>
      </router-link>

      <div class="momentItem" v-for="item in momentList" :key="item.index">
        <div class="auchor">
          <img :src="item.auchor.avatar" alt />
          <p>{{ item.auchor.name }}</p>
        </div>
        <div class="moment">
          <p>{{ item.content }}</p>
          <button>{{ item.commentCount }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      momentList: []
    }
  },
  created() {
    this.getMoment()
  },
  methods: {
    getMoment() {
      this.http.get('/moment?offset=0&size=30').then(res => {
        console.log(res)
        this.momentList = res.data.data.momentList
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.momentList {
  width: 1200px;
  margin: 0 auto;
}
.test {
  color: $theme-main;
}
</style>
