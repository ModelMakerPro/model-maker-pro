<template>
    <div class="code-wrapper" :id="code.title + '-code-block'">
        <div class="code-block">
            <p class="tips">变量 (渲染数据)</p>
            <pre><code class="code-block hljs lang-javascript" :id="'variable-' + id">{{code.variable}}</code></pre>
            <p class="tips">用法 (渲染模版)</p>
            <pre><code class="code-block hljs lang-javascript" :id="'template-' + id">{{code.template}}</code></pre>
            <p class="tips">结果 (渲染结果)</p>
            <pre><code class="code-block hljs lang-javascript" :id="'result-' + id">{{renderResult}}</code></pre>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .code-wrapper {
        max-width: 800px;
        display: block;
    }
    .code-block{
        padding-left: 10px;
    }
    .tips{
        font-size: 14px;
        line-height: 35px;
        padding-left: 5px;
        background: #eee;
        color: #353535;
        margin-top: 10px;
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
