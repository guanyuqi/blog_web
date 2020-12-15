<template>
  <div class="login-dialog">
    <el-dialog
      title="提示"
      :visible="visibleFlg"
      width="480px"
      @close="close"
      @open="open"
    >
      <!-- 标题 -->
      <div class="login-title">
        <h1>欢迎回来</h1>
        <h2>请填写下列信息进行登录</h2>
      </div>

      <!-- 表单 -->
      <div class="login-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="userRuleForm"
          label-position="top"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 提交 -->
      <div class="submit">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '官雨奇',
        password: '123'
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    /* 弹框显示Flg */
    visibleFlg: {
      get() {
        return this.$store.state.loginDialogFlg
      },
      set() {
        this.$store.dispatch('loginDialog', false)
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    login() {
      this.http
        .post('/login', this.ruleForm)
        .then(res => {
          localStorage.setItem('userInfo', res.data.data)
          this.$store.dispatch('setUserInfo', res.data.data)
          this.$message({
            showClose: true,
            message: '恭喜你，登录成功',
            type: 'success'
          })
          this.close()
        })
        .catch(err => {
          console.log(err)
        })
    },
    open() {
      console.log('我打开了')
    },
    close() {
      console.log('我关闭了')
      this.$store.dispatch('loginDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
/* 标题 */
.login-title {
  h1 {
    color: $text-color-title;
    font-size: 26px;
  }
  h2 {
  }
}

/* 提交 */
.submit {
  button {
    width: 100%;
  }
}
</style>
<style lang="scss">
.login-dialog {
  .el-dialog {
    border-radius: 10px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 10px 30px 30px;
    }
    .login-form {
      .userRuleForm {
        .el-form-item__label {
          font-size: 16px;
          font-weight: 600;
          color: $text-color-title;
        }
        .el-form-item__content {
          .el-input__inner {
            background-color: #f3f3f4;
            border-color: #f3f3f4;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
