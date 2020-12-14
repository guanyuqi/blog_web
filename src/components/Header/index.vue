<template>
  <div class="header">
    <div class="header-container">
      <div class="header-logo">
        <img
          src="https://sf1-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/logo.a7995ad.svg"
          alt=""
        />
      </div>
      <div class="nav">
        <div class="navItem">
          <router-link to="/">
            <p>主页</p>
          </router-link>
        </div>
        <div class="navItem">
          <router-link to="/editor">
            <p>编辑器</p>
          </router-link>
        </div>
        <div class="navItem">
          <router-link to="/editor">
            <p>待定</p>
          </router-link>
        </div>
      </div>
      <div class="right-item" v-if="(userInfo = null)">
        <div class="add-article">
          <router-link to="/editor">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="medium"
            ></el-button>
          </router-link>
        </div>

        <div class="user-info">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img
                src="https://byhub-1259170065.cos.ap-chengdu.myqcloud.com/avatar/initial.png"
                alt=""
              /><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="seting">设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="login" v-else>
        <el-button type="primary" size="medium" @click="login"> 登录</el-button>
      </div>
    </div>
    <Login></Login>
  </div>
</template>
<script>
import Login from './Login_dialog'

export default {
  components: {
    Login
  },
  data() {
    return {
      dialog_flg: false,
      userInfo: this.$store.state.userInfo
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          console.log('in')
          localStorage.setItem('userInfo', null)
          this.$store.dispatch('setUserInfo', null)
          break

        default:
          break
      }
      console.log(this.$store.state.userInfo)
      this.$message('click on item ' + command)
    },
    login() {
      this.$store.dispatch('loginDialog', true)
    }
  }
}
</script>
<style lang="scss">
.header {
  height: 60px;
  background-color: #fff;
  box-shadow: $shadow-sm;
}
.header-container {
  width: 1400px;
  height: 100%;
  margin: 0 auto;
  @include flex-between-center;
  .nav {
    @include flex-between-center;
    width: 300px;
    p {
      color: $text-color;
    }
  }
  .right-item {
    width: 180px;
    @include flex-between-center;
    .el-dropdown-link {
      @include flex-between-center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
  }
}
</style>
