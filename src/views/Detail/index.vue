<template>
  <div class="detail">
    <!-- 文章部分 -->
    <div class="article-box">
      <!-- 配图 -->
      <div class="cover-img" v-if="articleDetail.coverImg">
        <img :src="articleDetail.coverImg" alt="" />
      </div>

      <!-- 内容容器 -->
      <div class="detail-container">
        <!-- 标题 -->
        <h1 class="title">{{ articleDetail.title }}</h1>
        <!-- 作者相关 -->
        <div class="author" v-if="articleDetail">
          <div class="avatar">
            <img :src="articleDetail.user.avatar" alt="" />
          </div>
          <div class="author-info">
            <p class="name">{{ articleDetail.user.name }}</p>
            <p class="createTime">
              {{
                articleDetail.createTime.replace('T', ' ').replace('.000Z', '')
              }}
            </p>
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="article" v-html="articleDetail.content"></div>
      </div>
    </div>

    <!-- 评论 -->
    <div class="comment">
      <!-- 发表评论 -->
      <div class="submit-comment">
        <div class="avatar" v-if="articleDetail">
          <img v-if="userInfo" :src="userInfo.avatar" alt="" />
          <img v-else src="@/assets/avatar_default.png" alt="" />
        </div>
        <div class="comment-input">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入评论内容"
            v-model="commentInput"
            resize="none"
          >
          </el-input>
        </div>
        <div class="submit-btn">
          <el-button type="primary" @click="submitComment">发表评论</el-button>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comment-list" v-if="commentList.length">
        <div class="comment-item" v-for="item in commentList" :key="item.index">
          <div class="avtar"><img :src="item.user.avatar" alt="" /></div>
          <div class="comment-main">
            <p class="name">{{ item.user.name }}</p>
            <p class="content">{{ item.content }}</p>
            <div class="footer">
              <div class="footer-left">
                <span class="time">{{
                  item.createTime.replace('T', ' ').replace('.000Z', '')
                }}</span>

                <span
                  class="delete"
                  v-if="userInfo && userInfo.id == item.user.id"
                >
                  · 删除</span
                >
              </div>

              <div class="reply"><i class="el-icon-chat-round"></i> 回复</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 沙发位置 -->
      <div class="sofa" v-else>
        <p>还没有人评论,你要来一发吗?</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articleDetail: '',
      momentId: this.$route.query.momentId,
      /* 回复相关 */
      commentList: [],
      commentInput: ''
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo
    }
  },
  created() {
    this.getDatail()
    this.getComments()
  },
  methods: {
    getDatail() {
      this.http.get(`/moment/${this.momentId}`).then(res => {
        this.articleDetail = res.data.data.moment
        console.log(res)
      })
    },
    getComments() {
      this.http.get(`/comment/${this.momentId}`).then(res => {
        this.commentList = res.data.data.result
        console.log(this.commentList)
      })
    },
    submitComment() {
      if (!this.userInfo) {
        return this.$store.dispatch('loginDialog', true)
      }
      let data = {
        momentId: this.momentId,
        content: this.commentInput
      }

      this.http.post(`/comment`, data).then(res => {
        console.log(res)
        this.$message({
          showClose: true,
          message: '发表成功',
          type: 'success'
        })
        this.getComments()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  width: $type-area;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: $radius;
  padding-bottom: 200px;
}

.article-box {
  background-color: #fff;
  border-radius: $radius;
  overflow: hidden;
  /* 配图 */
  .cover-img {
    overflow: hidden;
    max-height: 250px;
    img {
      width: 100%;
      /*  max-height: 230px; */
    }
  }

  /* 内容容器 */
  .detail-container {
    box-sizing: border-box;
    padding: 40px 30px;
    /* 标题 */
    .title {
      color: $text-color-title;
    }

    /* 作者相关 */
    .author {
      margin-top: 20px;
      @include flex-base-center;
      .avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .author-info {
        margin-left: 10px;
        p {
          margin: 0;
        }
        .name {
          color: $text-color-title;
        }
        .createTime {
          margin-top: 10px;
          font-size: 14px;
          color: $text-color-grey;
        }
      }
    }

    /* 文章内容 */
    .article {
      margin-top: 50px;
    }
  }
}

/* 评论 */
.comment {
  margin-top: 50px;
  padding: 40px 30px;
  background: #fff;
  border-radius: $radius;
  box-sizing: border-box;

  /* 发表评论 */
  .submit-comment {
    height: 60px;

    @include flex-base-center;
    .avatar {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .comment-input {
      margin-left: 10px;
      width: 800px;
    }
    .submit-btn {
      margin-left: 10px;
      .el-button {
        height: 56px;
        box-sizing: border-box;
      }
    }
  }

  /* 评论区 */
  .comment-list {
    width: 800px;
    margin: 50px 0 0 70px;
    .comment-item {
      margin-bottom: 30px;
      @include flex-base;
      .avtar {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .comment-main {
        margin-left: 15px;
        flex: 1;
        color: $text-color-title;
        padding-bottom: 15px;
        border-bottom: 1px solid #f1f1f1;
        .content {
          margin: 10px 0;
          font-size: 14px;
        }
        .footer {
          @include flex-between;
          font-size: 14px;
          color: $text-color-grey;
          .footer-left {
            .time {
              font-size: 12px;
            }
            .delete {
              display: none;
              cursor: pointer;
            }
          }
        }
      }
      .comment-main:hover .footer .delete {
        display: inline;
      }
    }
  }
  .sofa {
    width: 800px;
    margin: 50px 0 0 70px;
    p {
      color: $text-color-grey;
    }
  }
}
</style>
<style lang="scss">
.detail {
  .article {
    font-weight: 400;
    line-height: 1.8;
    margin-bottom: 20px;
    word-break: break-word;
    ul {
      margin: 10px 20px;
      line-height: 30px;
      li {
        color: #595959;
      }
    }
    p {
      color: #333;
    }
    /* 引用 */
    blockquote {
      padding: 20px;
      background-color: #fafafa;
      border-left: 6px solid #e6e6e6;
      word-break: break-word;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      margin: 20px 0;
    }
    /* 代码块 */
    pre {
      position: relative;
      padding-left: 10px;
      counter-reset: linenumber;
      word-wrap: normal;
      word-break: break-all;
      white-space: pre;
      overflow-x: scroll;
      overscroll-behavior-x: contain;
      margin: 20px 0 10px 0;
      border-radius: 4px;
      z-index: 0;
      padding: 1em;
      line-height: 1.5;
      color: #ccc;
      background: #2d2d2d;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 40px 0 20px 0;
      color: $text-color-title;
    }

    h1,
    h2 {
      padding-left: 20px;
      /*   border-left: 3px solid $theme-blue; */
    }
  }
}
</style>
