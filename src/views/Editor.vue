<template>
  <div class="editor">
    <router-link to="/">
      <h2>主页</h2>
    </router-link>
    <div class="container">
      <div class="editor">
        <div id="editor-container"></div>
        <button @click="getEditorData">获取内容</button>
      </div>
      <div
        class="preview"
        id="preview"
        ref="preview"
        v-html="this.editorData"
      ></div>
    </div>
  </div>
</template>
<script>
import wangEditor from 'wangeditor'
export default {
  data() {
    return {
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
    getEditorData() {
      console.log(this.editorData)
      /* this.$refs.preview.innerHTML = this.editorData */
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  .preview,
  .editor {
    flex: 1;
    height: 100%;
  }
}
#preview {
  padding: 20px;
  background-color: #f9f9f9;
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
