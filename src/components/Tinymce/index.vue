<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init"></editor>
  </div>
</template>

<script>
//引入基础文件：
/* import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/mobile/theme'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default' */
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/mobile/theme'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'

/* import '../../../public/tinymce/codesample/prism.css'*/
/* import 'tinymce/codesample/prism.js' */

/* 插件引入 */
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/link' //链接
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/codesample' // 代码演示

export default {
  name: 'tinymce',
  components: {
    Editor
  },
  props: {
    curValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      init: {
        language_url: '/tinymce/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', //语言
        skin_url: '/tinymce/skins/ui/oxide', // skin路径
        height: 500, //编辑器高度
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: false, //顶部菜单栏显示
        plugins: [
          'image',
          'link',
          'code',
          'preview',
          'table',
          'wordcount',
          'lists',
          'codesample'
        ],
        toolbar: [
          'formatselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist  table  |   link image codesample | removeformat | wordcount  preview'
        ],
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'PHP', value: 'php' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' }
        ],
        codesample_global_prismjs: true,
        codesample_content_css: 'http://ourcodeworld.com/material/css/prism.css'
      },
      value: this.curValue
    }
  },
  mounted() {
    tinymce.init({})
  },
  watch: {
    //动态传参
    curValue(newValue) {
      this.value = newValue
    },
    //读取输入框内的数据
    value(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
