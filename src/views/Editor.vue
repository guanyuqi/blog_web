<template>
  <div class="editor">
    <div class="container">
      <!-- 标题输入 -->
      <div class="title-input">
        <el-input placeholder="请输入内容" v-model="articleForm.title">
          <template slot="prepend">文章标题</template>
        </el-input>
      </div>
      <!-- 富文本编辑器 -->
      <div class="editor-container" id="editor-container"></div>
      <!-- 标签选择 -->
      <div class="label">
        <p>请选择文章标签</p>
        <div class="label-list">
          <span
            class="label-item"
            :ref="'labelItem' + index"
            v-for="(item, index) in labels"
            :key="item.index"
            @click="selectLabel(index)"
            >{{ item.name }}</span
          >
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="addLabelInput"
            ref="saveLableInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 添加标签</el-button
          >
        </div>
      </div>
      <!-- 提交 -->
      <div class="submit">
        <el-button type="primary" @click="submit">主要按钮</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import wangEditor from 'wangeditor'
export default {
  data() {
    return {
      editor: null,
      articleForm: {
        title: '',
        content: '请输入'
      },
      /* 标签 */
      labels: '',
      inputVisible: false,
      addLabelInput: '',
      addLabelList: []
    }
  },
  created() {
    this.getLabelList()
  },
  mounted() {
    const editor = new wangEditor(`#editor-container`)

    editor.config.height = 500
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.articleForm.content = newHtml
    }
    editor.config.uploadImgServer = '/upload-img'
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  methods: {
    getLabelList() {
      this.http.get('/label?limit=0&offset=10').then(res => {
        this.labels = res.data.data.result
      })
    },
    submit() {
      this.http.post('/moment', this.articleForm).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: '发表成功',
            type: 'success'
          })
          let momentId = res.data.data.result.insertId
          this.addMomentLabel(momentId)
        }
      })
    },
    /* 标签相关 */
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveLableInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      if (!this.addLabelInput) return
      this.http.post('/label', { name: this.addLabelInput }).then(res => {
        if (res.data.code == 0) {
          this.labels.push({ name: this.addLabelInput })
          this.inputVisible = false
          this.addLabelInput = ''
        }
      })
    },
    selectLabel(index) {
      let labelIndex = this.addLabelList.indexOf(this.labels[index].name)
      if (labelIndex == -1) {
        if (this.addLabelList.length == 4) {
          this.$message({
            message: '最多只能添加4条',
            type: 'warning'
          })
          console.log()
          return
        }
        this.$refs[`labelItem${index}`][0].classList.add('active')
        this.addLabelList.push(this.labels[index].name)
      } else {
        this.$refs[`labelItem${index}`][0].classList.remove('active')
        this.addLabelList.splice(labelIndex, 1)
      }
      console.log(this.addLabelList)
    },
    addMomentLabel(momentId) {
      let data = { labels: this.addLabelList }
      if (!data.labels.length) {
        data.labels.push('生活')
      }
      this.http.post(`/moment/${momentId}/labels`, data).then(res => {
        if (res.data.code == 0) {
          this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.editor {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
}

/* 富文本编辑器 */
.editor-container {
  margin-top: 20px;
}
/* 标签选择 */
.label {
  p {
    color: $text-color;
  }
  .label-list {
    .label-item {
      display: inline-block;
      margin-right: 20px;
      padding: 5px 20px;
      background-color: #e7e9f2;
      color: $text-color;
      font-size: 14px;
      border: 1px solid $text-color-disable;
      border-radius: $radius;
      cursor: pointer;
    }
    .label-item:hover {
      border-color: $theme-blue;
      color: $theme-blue;
    }
    .active {
      border-color: $theme-blue;
      color: $theme-blue;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
}

/* 提交 */
.submit {
  margin-top: 50px;
}
</style>
<style lang="scss">
.w-e-toolbar {
  z-index: 2 !important; // 这是工具栏
}
.w-e-text-container {
  z-index: 1 !important; // 这是内容框
}
</style>
