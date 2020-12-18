<template>
  <div class="home">
    <!-- 主体部分 -->
    <div class="content">
      <!-- 文章列表 -->
      <div class="momentList">
        <p class="title">全部文章</p>
        <!-- 动态子项 -->
        <div class="momentItem" v-for="(item,index) in momentList" :key="item.index">
          <!-- 动态左侧内容 -->
          <div class="moment-info">
            <!-- 动态头部 -->
            <div class="moment-head">
              <img :src="item.auchor.avatar" alt />
              <p>{{ item.auchor.name }}</p>
            </div>
            <!-- 动态标题 -->
            <div class="moment-title wow animate__fadeInUp" data-wow-duration="1.5s">
              <router-link :to="{ path: '/detail', query: { momentId: item.id } }">
                <p>{{ item.title }}</p>
              </router-link>
            </div>
            <!-- 动态底部 -->
            <div class="moment-footer">
              <!-- 时间 -->
              <div class="footer-item">
                <i class="el-icon-time"></i>
                <span>
                  {{
                  item.createTime.replace('T', ' ').replace('.000Z', '')
                  }}
                </span>
              </div>
              <!-- 评论 -->
              <div class="footer-item">
                <i class="el-icon-chat-line-round"></i>
                <span>{{ item.commentCount }}</span>
              </div>
              <!-- 标签 -->
              <div class="footer-item label">
                <span v-for="label in item.labels" :key="label.index">
                  {{
                  label.name
                  }}
                </span>
              </div>

              <!-- 删除 -->
              <div class="footer-item delete" v-if="userInfo && userInfo.id == item.auchor.id">
                <el-popconfirm title="你确定要删除文章吗？" @confirm="deleteMoment(item.id,index)">
                  <el-button slot="reference" type="text">· 删除</el-button>
                </el-popconfirm>
              </div>
            </div>
          </div>
          <!-- 动态配图 -->
          <div class="cover-img" v-if="item.coverImg">
            <img :src="item.coverImg" alt />
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <div class="pagination-body">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="20"
              layout="total, prev, pager, next"
              :total="totleSize"
            ></el-pagination>
          </div>
        </div>
      </div>

      <!-- 面板 -->
      <div class="panel">
        <div class="panel-body">
          <p class="title">全部标签</p>
          <div class="label-list">
            <span
              class="label-item"
              v-for="item in labelList"
              :key="item.index"
            >{{ item.name }} [{{ item.count > 99 ? '99+' : item.count }}]</span>
          </div>
        </div>
      </div>
    </div>

    <div class="test"></div>
  </div>
</template>

<script>
/* 引入wow.js */
import { WOW } from 'wowjs'
import { scrollTo } from '@/utils/public.js'
export default {
  name: 'Home',
  data() {
    return {
      momentList: [],
      labelList: [],
      /* 分页相关 */
      totleSize: '',
      offset: 0,
      pageSize: 20
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo
    }
  },
  created() {
    this.getMoment()
    this.getLabelList()
  },
  methods: {
    /* 获取数据 */
    getMoment() {
      this.http
        .get(`/moment?offset=${this.offset}&size=${this.pageSize}`)
        .then(res => {
          console.log(res)
          this.momentList = res.data.data.momentList
          this.totleSize = res.data.data.count
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLabelList() {
      this.http.get('/label').then(res => {
        this.labelList = res.data.data.result
      })
    },
    /* 删除动态 */
    deleteMoment(momentId, index) {
      this.http.post('/moment/delete/' + momentId).then(res => {
        console.log(res)
        this.momentList.splice(index, 1)
        this.$message({
          showClose: true,
          message: '删除动态成功',
          type: 'success'
        })
      })
    },
    /* 分页相关 */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.pageSize
      this.getMoment()
      scrollTo('momentList')
    }
  },
  watch: {
    momentList() {
      console.log('你他娘终于更新玩了')
      this.$nextTick(() => {
        // 在dom渲染完后,再执行动画
        var wow = new WOW({
          live: false
        })
        wow.init()
        console.log('wow挂在成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: $type-area;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 200px;
}

/* 主体部分 */
.content {
  @include flex-base;
  /* 文章列表 */
  .momentList {
    flex: 1;
    margin-right: 20px;
    .title {
      color: $text-color-grey;
      font-size: 18px;
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
          .delete {
            display: none;
          }
        }
        .moment-footer:hover .delete {
          display: block;
          animation: fadeIn;
          animation-duration: 800ms;
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

    .pagination {
      margin-top: 20px;

      @include flex-base;
      flex-direction: row-reverse;
      .pagination-body {
        background-color: #fff;
        box-sizing: border-box;
        padding: 10px;

        border-radius: $radius;
      }
    }
  }

  /* 面板 */
  .panel {
    width: 320px;

    /* background-color: #ccc; */
    .panel-body {
      position: sticky;
      top: 20px;
      p {
        color: $text-color-title;
        font-size: 18px;
      }
      .label-list {
        background-color: #fff;
        margin-top: 20px;
        padding: 10px 10px;
        border-radius: $radius;
        .label-item {
          margin: 6px;
          display: inline-block;
          padding: 2px 10px;
          color: $text-color-title;
          background: #e0e0e0;
          border: 1px solid $border-color;
          border-radius: $radius;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}

.test {
  margin-top: 100px;
  height: 300px;
  background-color: #ccc;
  .block {
    height: 200px;
    width: 200px;
    background-color: red;
  }
}
</style>
