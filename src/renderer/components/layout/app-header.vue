<template>
    <div class="header">
        <router-link tag="span" :to="{name: 'NewProject'}">
            <Button type="primary">新建项目</Button>
        </router-link>
        <Button type="error" v-show="projectIndex >= 0" @click="showDeleteConfirm = true">
            删除当前项目
        </Button>
        <router-link tag="span" :to="{name: 'ExportPage'}">
            <Button type="primary">根据模版导出文件</Button>
        </router-link>
        <!--马上同步到本地文件-->
        <div @click="$project.syncToLocalFile($store.getters.projectList, $store.dispatch('showNotice', {type: 'success', title: '保存成功', desc: '项目已同步到本地文件中!'}))"
             class="save-to-local-btn">
            <Tooltip content="马上同步到本地文件中">
                <Icon type="ios-cloud-download" size="35"></Icon>
            </Tooltip>
        </div>
        <!--马上同步本地目录-->
        <div @click="$project.syncProject()" class="sync-btn">
            <Tooltip content="从本地文件同步到软件中">
                <Icon type="ios-cloud-upload" size="35"></Icon>
            </Tooltip>
        </div>
        <!--设置-->
        <router-link tag="div" :to="{name: 'Settings'}">
            <div class="config-btn">
                <Icon type="gear-b" size="35"></Icon>
            </div>
        </router-link>
        <!--删除项目-->
        <Modal v-model="showDeleteConfirm" title="请输入项目名称" @on-ok="confirmDelete"
               @on-cancel="()=>{showDeleteConfirm = false}">
            确定删除当前项目 ？ <br>
            <b>操作无法回复 建议先导出项目</b>
        </Modal>
    </div>
</template>
<style lang="less" scoped>
    .header {
        line-height: 60px;
        padding: 0 10px;
        position: relative;
        .save-to-local-btn, .sync-btn, .config-btn {
            cursor: pointer;
        }
        .save-to-local-btn {
            position: absolute;
            top: 10px;
            right: 120px;
        }
        .sync-btn {
            position: absolute;
            top: 10px;
            right: 70px;
        }
        .config-btn {
            position: absolute;
            top: 10px;
            right: 20px;
        }
    }
</style>
<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import * as types from '../../store/mutation-types'

  export default {
    data () {
      return {
        showDeleteConfirm: false
      }
    },
    computed: {
      ...mapGetters(['projectIndex'])
    },
    methods: {
      confirmDelete () {
        let project = this.$store.getters.projectList[this.$store.getters.projectIndex]
        if (project && project.id) {
          this.$store.commit(types.DELETE_PROJECT, this.projectIndex)
          this.$store.commit(types.UPDATE_SELECT_INDEX, null)
          // 删除工作空间中储存的项目
          this.$project.syncDeleteProject(project)
          this.$Message.success(`删除项目 ${project.name} 成功`)
          if (this.$store.getters.projectList.length > 0) {
            this.$store.commit(types.UPDATE_SELECT_INDEX, 0)
          }
        } else {
          this.$Message.info('没有项目可以删除 请先新建项目')
        }
      }
    }
  }
</script>
