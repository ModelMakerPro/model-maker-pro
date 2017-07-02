<template>
    <div :style="contentWarpHeight" v-if="settings !== null">
        <Form :model="settings" label-position="top">
            <Form-item label="工作空间">
                <Row>
                    <Col :span="20">
                    <Input :value="settings.workspace" disabled></Input>
                    </Col>
                    <Col :span="4">
                    <Button @click="choseWorkspace" style="width: 100%" type="primary">更改</Button>
                    </Col>
                </Row>
            </Form-item>

            <Form-item label="新建表格是否自动添加以下属性: id, createdAt, del, deletedAt">
                <i-switch v-model="settings.autoAddFieldWhenTableCreate"></i-switch>
            </Form-item>
        </Form>

    </div>
</template>
<style lang="less" scoped>
</style>
<script type="text/ecmascript-6">
  import { openDialog } from '@/utils/electron-helper'
  import * as types from '@/vuex/mutation-types'
  import * as keys from '@/vuex/modules/store-keys'
  import { save } from '@/utils/localstorage'
  export default{
    data () {
      return {
        log: {
          all: 'all_1',
          success: 'success_1',
          info: 'info_1',
          warning: 'warning_1'
        },
        settings: null
      }
    },
    watch: {
      vuexSettings (val) {
        save({key: keys.SETTINGS, value: val})
        this.settings = this.clone(val)
      },
      settings: {
        deep: true,
        handler (val) {
          save({key: keys.SETTINGS, value: val})
          this.$store.commit(types.UPDATE_SETTINGS, val)
        }
      }
    },
    computed: {
      vuexSettings () {
        return this.$store.getters.allSettings
      }
    },
    methods: {
      getLogs (type) {
        let allLogs = this.settings.logs || []
        let logs = allLogs
        if (!type) {
          return logs
        }
        let list = []
        logs.forEach((log) => {
          if (log.type === type) {
            list.push(log)
          }
        })
        return list
      },
      choseWorkspace () {
        openDialog(res => {
          if (res && res.length > 0) {
            this.settings.workspace = res[0]
            // 更改配置的时候就要顺便同步项目
            this.$project.syncProject(true, res[0])
          }
        })
      },
      choseTemplate () {
        openDialog(res => {
          if (res && res.length > 0) {
            this.$set(this.settings, 'templateDir', res[0])
          }
        })
      }
    },
    mounted () {
      this.settings = this.clone(this.$store.getters.allSettings)
    }
  }
</script>
