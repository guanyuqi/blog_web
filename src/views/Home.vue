<template>
  <div class="home">
    <div class="momentList">
      <div class="momentItem" v-for="item in momentList" :key="item.index">
        <div class="moment-head">
          <img :src="item.auchor.avatar" alt />
          <p>{{ item.auchor.name }}</p>
        </div>
        <div class="moment-title">
          <p>{{ item.title }}</p>
        </div>
        <div class="moment-footer">
          <div class="footer-item">
            <i class="el-icon-time"></i>
            <span>{{
              item.createTime.replace('T0', ' ').replace('.000Z', '')
            }}</span>
          </div>
          <div class="footer-item">
            <i class="el-icon-chat-line-round"></i>
            <span>{{ item.commentCount }}</span>
          </div>
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
.momentItem {
  padding: 10px 20px;
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: $radius;
  background-color: #fff;
  @include flex-between;
  flex-direction: column;
  .moment-head {
    height: 40px;
    @include flex-base-center;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    p {
      margin-left: 10px;
      color: $text-color;
    }
  }
  .moment-title {
    flex: 1;
    line-height: 60px;
    p {
      font-weight: 600;
      font-size: 18px;
      color: $text-color-title;
    }
  }
  .moment-footer {
    @include flex-between-center;
    height: 40px;
    width: 200px;
    .footer-item {
      color: $text-color-grey;
      @include flex-between-center;
      span {
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }
}

.test {
  color: $theme-main;
}
</style>
