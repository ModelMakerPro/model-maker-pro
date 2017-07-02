<template>
    <div class="code-warpper" :id="code.title + '-code-block'">
        <p class="title" :class="{'highlight': code.highlight}">{{code.title}} ({{code.comment}})</p>
        <div class="code-block">
            <p class="tips">变量(传入的Model)</p>
            <pre><code class="code-block hljs lang-javascript" :id="'variable-' + id">{{code.variable}}</code></pre>
            <p class="tips">用法(需要渲染的模版)</p>
            <pre><code class="code-block hljs lang-javascript" :id="'template-' + id">{{code.template}}</code></pre>
            <p class="tips">结果(输出结果)</p>
            <pre><code class="code-block hljs lang-javascript" :id="'result-' + id">{{renderResult}}</code></pre>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .code-warpper {
        max-width: 800px;
        display: block;
    }

    .title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
        background: #e3e8ee;
        color: black;
        padding-left: 20px;
        border-left: 4px solid #464c5b;
        box-sizing: border-box;
        &.highlight{
            border: 2px dashed #ff3300;
        }
    }
    .code-block{
        padding-left: 10px;
    }
    .tips{
        font-size: 14px;
        line-height: 35px;
        padding-left: 5px;
        background: #e3e8ee;
        color: black;
    }

    .code-block {
    }
</style>
<script type="text/ecmascript-6">
  import UUID from 'uuid'
  const highlightjs = require('highlight.js')
  export default{
    props: {
      code: {
        type: Object
      }
    },
    data () {
      return {
        id: UUID.v1(),
        renderResult: null
      }
    },
    methods: {
      renderCode () {
        this.renderResult = this.$project.renderTemplate(this.code.variable, this.code.template)
        this.$nextTick(() => {
          let variableBlock = window.document.getElementById('variable-' + this.id)
          let templateBlock = window.document.getElementById('template-' + this.id)
          let resultBlock = window.document.getElementById('result-' + this.id)
          highlightjs.highlightBlock(variableBlock)
          highlightjs.highlightBlock(templateBlock)
          highlightjs.highlightBlock(resultBlock)
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.renderCode()
      })
    }
  }
</script>
