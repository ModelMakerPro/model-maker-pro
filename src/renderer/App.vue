<template>
    <div class="layout" >
        <Row type="flex" @.19="save">
            <i-col span="4" class="layout-menu-left" :style="fullHeight">
                <app-slider></app-slider>
            </i-col>
            <i-col span="20">
                <div class="layout-header">
                    <app-header></app-header>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
                <div class="layout-copy">
                    2017-2018 &copy; Deboy
                </div>
            </i-col>
        </Row>
    </div>
</template>
<style scoped lang="less">
    @import "~highlight.js/styles/monokai-sublime.css";
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }

    .layout-menu-left {
        background: #464c5b;
    }

    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-ceiling-main a {
        color: #9ba7b5;
    }

    .layout-hide-text .layout-text {
        display: none;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }
</style>
<style lang="less">
    @import './styles/tree-view';
    * {
        margin: 0;
        padding: 0;
    }

    html, body, #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    * {
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar {
            width: 6px;
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #9ea7b4;
        }
    }
    .border-r {
        border-right: 1px solid #cccccc;
    }
</style>
<script>
  import AppSlider from 'components/layout/app-slider'
  import AppHeader from 'components/layout/app-header'
  import * as types from './vuex/mutation-types'
  import { save } from './utils/localstorage'
  import { PROJECTS } from './vuex/modules/store-keys'
  const _ = require('lodash')
  export default {
    components: {
      AppSlider,
      AppHeader
    },
    computed: {
      projectList () {
        return this.$store.getters.projectList
      }
    },
    watch: {
      // 跟路由监听项目列表变化 所有的的改变都在这里响应到本地文件储存中 延迟五秒
      '$store.state.projects.list': {
        deep: true,
        handler: _.debounce(function (val) {
          console.log('save to local storage')
          save({key: PROJECTS, value: val})
        }, 3000)
      }
    },
    mounted () {
      this.$store.dispatch('showNotice', '欢迎使用')
      window.addEventListener('resize', () => {
        this.$store.commit(types.WINDOW_ON_RESIZE)
      })
      // 先同步软件上的项目到本地 同步完成再同步本地的项目到软件存储中
//      this.$project.syncToLocalFile(this.$store.getters.projectList, () => {
//        this.$project.syncProject(false)
//      })
      window.document.addEventListener('keydown', (e) => {
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.shiftKey) {
          e.preventDefault()
          this.$project.syncToLocalFile(this.$store.getters.projectList, (success) => {
            if (success) {
              this.$store.dispatch('showNotice', {type: 'success', title: '保存成功', desc: '项目已同步到本地文件中!'})
            }
          })
        }
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.altKey) {
          e.preventDefault()
          this.$project.syncProject(true, this.$store.getters.workspace, false)
        }
      }, false)
    }
  }
</script>
