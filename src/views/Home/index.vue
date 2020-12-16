<template>
  <div class="home">
    <div class="momentList">
      <!-- 动态子项 -->
      <div class="momentItem" v-for="item in momentList" :key="item.index">
        <!-- 动态左侧内容 -->
        <div class="moment-info">
          <!-- 动态头部 -->
          <div class="moment-head">
            <img :src="item.auchor.avatar" alt />
            <p>{{ item.auchor.name }}</p>
          </div>
          <!-- 标题 -->
          <div class="moment-title">
            <router-link
              :to="{ path: '/detail', query: { momentId: item.id } }"
            >
              <p>{{ item.title }}</p></router-link
            >
          </div>
          <div class="moment-footer">
            <!-- 标签 -->
            <div class="footer-item label">
              <span v-for="label in item.labels" :key="label.index">{{
                label.name
              }}</span>
            </div>

            <!-- 评论 -->
            <div class="footer-item">
              <i class="el-icon-chat-line-round"></i>
              <span>{{ item.commentCount }}</span>
            </div>
            <!-- 时间 -->
            <div class="footer-item">
              <i class="el-icon-time"></i>
              <span>{{
                item.createTime.replace('T', ' ').replace('.000Z', '')
              }}</span>
            </div>
          </div>
        </div>
        <!-- 动态配图 -->
        <div class="cover-img" v-if="item.coverImg">
          <img :src="item.coverImg" alt="" />
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
      this.http
        .get('/moment?offset=0&size=30')
        .then(res => {
          console.log(res)
          this.momentList = res.data.data.momentList
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.momentList {
  width: $type-area;
  margin: 0 auto;
}
.momentItem {
  padding: 10px 20px;
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: $radius;
  background-color: #fff;
  @include flex-between;

  /* 动态左侧内容 */
  .moment-info {
    width: 600px;
    @include flex-between;
    flex-direction: column;
    /* 动态头部 */
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
    /* 标题 */
    .moment-title {
      flex: 1;
      line-height: 60px;
      p {
        font-weight: 600;
        font-size: 18px;
        color: $text-color-title;
      }
    }
    /* 动态底部 */
    .moment-footer {
      @include flex-base-center;
      height: 40px;

      .footer-item {
        margin-right: 20px;
        color: $text-color-grey;
        @include flex-between-center;
        span {
          margin-left: 5px;
          font-size: 12px;
        }
      }
      .label {
        span {
          display: inline-block;
          padding: 2px 10px;
          color: #fff;
          border-radius: $radius;
          margin-right: 10px;
        }
        span:nth-child(1) {
          background-color: rgba($color: $theme-purple, $alpha: 0.8);
        }
        span:nth-child(2) {
          background-color: rgba($color: $theme-yellow, $alpha: 0.8);
        }
        span:nth-child(3) {
          background-color: rgba($color: $theme-green, $alpha: 0.8);
        }
        span:nth-child(4) {
          background-color: rgba($color: $theme-red, $alpha: 0.8);
        }
      }
    }
  }

  /* 动态配图 */
  .cover-img {
    img {
      height: 176px;
      width: 176px;
      object-fit: cover;
    }
  }
}
</style>
