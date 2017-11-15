<template>
    <div :style="contentWarpHeight">
        <Row>
            <i-col span="16">
                <Button type="primary" @click.native="openCustomUrl('http://handlebarsjs.com/')">官方模版语法</Button>
                <Button type="primary" @click.native="openCustomUrl()">第三方帮助函数文档</Button>
            </i-col>
            <i-col span="8">
                <i-input v-model="query" @keyup.enter.native="search" placeholder="请输入关键词查找 大小写敏感 可以是功能名称"></i-input>
            </i-col>
        </Row>
        <p style="font-size: 16px;padding: 5px 0">以下是软件自带的几个帮助函数文档 (会逐步把第三方文档迁移到此处 方便查询)</p>
        <template v-for="(code, index) in codes">
            <Collapse v-model="opens" style="margin-bottom: 5px">
                <Panel :name="`code-block-${index}`">
                    <span slot="default" :class="{'highlight': code.highlight}"> {{code.title}} ({{code.comment}})</span>
                    <p slot="content">
                        <code-block :code="code"></code-block>
                    </p>
                </Panel>
            </Collapse>
            <!--<code-block :code="code"></code-block>-->
        </template>
    </div>
</template>
<style lang="less" scoped>
    .highlight {
        color: red;
    }
</style>
<script type="text/ecmascript-6">
  import CodeBlock from '../components/code-block'
  import helpers from '../config/helper'

  const open = require('open')

  export default {
    components: {
      CodeBlock
    },
    data () {
      return {
        query: null,
        codes: helpers,
        opens: []
      }
    },
    methods: {
      search () {
        if (this.query) {
          let opens = []
          this.codes.forEach((code, index) => {
            let hl = false
            if (code.title.indexOf(this.query) > -1 || code.comment.indexOf(this.query) > -1) {
              hl = true
              opens.push(`code-block-${index}`)
            }
            this.codes[index].highlight = hl
          })
          this.opens = opens
        }
      },
      openCustomUrl (url = null) {
        if (url) {
          open(url)
        } else {
          let urls = [
            'http://assemble.io/helpers/',
            'https://github.com/NEYouFan/nei-toolkit/blob/master/doc/Handlebars%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0%E9%9B%86.md'
          ]
          urls.forEach((u) => {
            open(u)
          })
        }
      }
    }
  }
</script>
