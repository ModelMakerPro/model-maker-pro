<template>
    <div>
        <Row :style="contentWarpHeight">
            <i-col :span="6" class="slider" :style="contentWarpHeight">
                <Form :model="form" label-position="top">
                    <h3 style="margin: 10px 0">导出配置</h3>
                    <!--导出配置-->
                    <Form-item label="请选择模版">
                        <Select v-model="form.tplIndex">
                            <Option v-for="(item, index) in templateList" :value="index" :key="index">{{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>
                    <template v-if="tpl && tpl.type === 'list'">
                        <h3 style="margin: 10px 0">预览配置</h3>
                        <!--预览配置-->
                        <Form-item label="预览表选择(默认第一个)">
                            <Select v-model="form.previewTableIndex">
                                <Option v-for="(item, index) in projectTableIndexAndLabels" :value="item.index"
                                        :key="index">{{ item.name}}({{item.comment}})
                                </Option>
                            </Select>
                        </Form-item>
                    </template>
                    <h3 style="margin: 10px 0">语法高亮选择</h3>
                    <Form-item label="右侧预览代码语法">
                        <Select v-model="lang">
                            <Option v-for="(item, index) in ['sql', 'java', 'php', 'javascript', 'html']" :value="item"
                                    :key="index">{{ item }}
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item>
                        <Button style="width: 60px" :dsiabled="onLoad" @click="preview" type="primary">
                            {{onLoad ? 'loading...' : '预览'}}
                        </Button>
                        <Button style="width: 60px" :dsiabled="onLoad" @click="preview(false)" type="success">
                            导出
                        </Button>
                        <Button style="width: 90px" :dsiabled="onLoad" @click="openPreviewModel" type="info">
                            Model 预览
                        </Button>
                        <Button mini @click="openHelper" type="info">
                            帮助
                        </Button>
                    </Form-item>
                    <div class="tips">
                        <p>快捷键列表</p>
                        <ul>
                            <li><code class="key-code">Ctrl + Shift + A</code> <span class="function">预览结果</span></li>
                            <li><code class="key-code">Ctrl + Shift + M</code> <span class="function">预览Model</span>
                            </li>
                            <li><code class="key-code">Ctrl + Shift + H</code> <span class="function">打开帮助文档</span></li>
                        </ul>
                    </div>
                </Form>
            </i-col>
            <i-col :span="18" style="padding: 0 10px" :style="contentWarpHeight">
            <pre v-if="contentString" :style="contentWarpHeight" class="code"><code id="create-code"
                                                                                    class="html"
                                                                                    :class="['lang-' + lang]"
                                                                                    v-text="contentString"></code></pre>
            </i-col>
        </Row>
        <Modal v-model="showModelPreview" :width="900" :styles="{top: '0px'}">
            <div style="color: red;font-size: 16px;padding: 10px 0;font-weight: bold" v-if="templateList[form.previewTableIndex] && templateList[form.previewTableIndex].type === 'project'">
                为避免Modal数据过多导致预览慢的问题，tables 仅显示第一个表格的 Model
            </div>
            <div class="model-preview-wrapper" :style="{height: screenHeight}">
                <tree-view :data="previewModel" :options="{maxDepth: 3}"></tree-view>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    .model-preview-wrapper {
        display: block;
        overflow-y: scroll;
    }

    .tips {
        font-size: 14px;
        border-top: 1px solid #e3e8ee;
        p {
            padding: 5px 0;
            font-weight: 600;
            font-size: 16px;
        }
        li {
            margin-bottom: 3px;
            code {
                background: #657180;
                color: white;
                padding: 2px 10px;
                border-radius: 5px;
            }
            .function {
                float: right;
            }
        }

    }

    .code {
        font-size: 16px;
        height: 100%;
        code {
            height: 100%;
        }
    }

    .slider {
        padding-right: 10px;
        border-right: 1px solid #d7dde4;
    }

    .divider {
        margin-bottom: 10px;
        border-bottom: 1px solid #d7dde4;
    }

    pre {
        background: white !important;
    }
</style>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  const highlightjs = require('highlight.js')
  export default {
    data () {
      return {
        form: {
          tplIndex: null,
          previewTableIndex: 0
        },
        lang: 'php',
        onLoad: false,
        contentString: null,
        showModelPreview: false,
        previewModel: null,
        templateList: []
      }
    },
    computed: {
      screenHeight () {
        return window.document.body.clientHeight - 100 + 'px'
      },
      tpl: {
        cache: false,
        get () {
          if (this.form.tplIndex !== null) {
            return this.templateList[this.form.tplIndex]
          } else {
            return null
          }
        }
      },
      ...mapGetters(['projectTableIndexAndLabels'])
    },
    watch: {
      lang (val) {
        if (this.form.tplIndex !== null) {
          this.preview()
        }
      }
    },
    methods: {
      openHelper () {
        this.$router.push({name: 'Helper'})
      },
      openPreviewModel () {
        this.setPreviewModel()
      },
      setPreviewModel () {
        this.previewModel = null
        let previewModel = this.$project.getTablePreview(this.form.previewTableIndex, this.templateList[this.form.previewTableIndex] && this.templateList[this.form.previewTableIndex].type)
        if (this.templateList[this.form.previewTableIndex].type) {
          // this.$Message.info('为避免Modal数据过多导致预览慢的问题，tables 仅显示第一个表格的 Model')
          previewModel.tables = [previewModel.tables[0]]
          this.previewModel = previewModel
        } else {
          this.previewModel = previewModel
        }
        this.showModelPreview = true
      },
      highlight () {
        this.$nextTick(() => {
          let codeBlocks = document.getElementById('create-code')
          highlightjs.highlightBlock(codeBlocks)
        })
      },
      preview (isPreview = true) {
        if (this.tpl === null) {
          this.$store.dispatch('showNotice', {
            type: 'info',
            title: '请先选择模版'
          })
          return
        }
        this.onLoad = true
        this.contentString = this.$project.exportFileByCustomTemplate(this.tpl, isPreview, this.form.previewTableIndex)
        if (isPreview) {
          this.highlight()
        }
        this.onLoad = false
      },
      watchKeyDown (e) {
        if (e.shiftKey && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
          switch (e.keyCode) {
            case 65:
              this.preview()
              break
            case 77:
              this.openPreviewModel()
              break
            case 72:
              this.openHelper()
              break
          }
        }
      },
      setTemplateList () {
        this.templateList = this.$store.getters.templateList
      }
    },
    activated () {
      window.document.addEventListener('keydown', this.watchKeyDown, false)
      this.setTemplateList()
    },
    deactivated () {
      window.document.removeEventListener('keydown', this.watchKeyDown)
    }
  }
</script>
