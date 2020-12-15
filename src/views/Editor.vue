<template>
  <div class="editor">
    <div class="container">
      <div class="title-input">
        <el-input placeholder="请输入内容" v-model="inputTitle">
          <template slot="prepend">文章标题</template>
        </el-input>
      </div>
      <div class="editor-container" id="editor-container"></div>
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
      inputTitle: '',
      editor: null,
      editorData: '请输入'
    }
  },
  mounted() {
    const editor = new wangEditor(`#editor-container`)

    editor.config.height = 500
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.editorData = newHtml
    }
    editor.config.uploadImgServer = '/upload-img'
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  methods: {
    submit() {
      let data = {
        content: this.editorData,
        title: this.inputTitle
      }
      this.http.post('/moment', data).then(res => {
        if (res.data.code == 0) {
          this.$router.push({ path: '/' })
          this.$message({
            showClose: true,
            message: '发表成功',
            type: 'success'
          })
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
  /* position: absolute; */
}
.editor-container {
  margin-top: 20px;
}
</style>
<style lang="scss">
.editor {
  .preview {
    p {
      color: #404040 !important;
    }
    pre {
      position: relative;
      padding-left: 30px;
      counter-reset: linenumber;
      word-wrap: normal;
      word-break: break-all;
      white-space: pre;
      overflow-x: scroll;
      overscroll-behavior-x: contain;
      margin-top: 0;
      margin-bottom: 20px;
      border-radius: 4px;
      z-index: 0;
      padding: 1em;
      line-height: 1.5;
      color: #ccc;
      background: #2d2d2d;
    }
  }
}
</style>
