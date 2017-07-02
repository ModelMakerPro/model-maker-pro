<template>
    <div>
        <Row>
            <h4>日志记录</h4>
            <Tabs value="all">
                <Tab-pane label="全部" name="all">
                    <Collapse v-model="log.all">
                        <template v-for="(log, index) in getLogs()">
                            <Panel :name="'all_' + index">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                    标题: {{log.title}} <br>
                                    内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </template>
                    </Collapse>
                </Tab-pane>
                <Tab-pane label="成功" name="success">
                    <Collapse v-model="log.success">
                        <template v-for="(log, index) in getLogs('success')">
                            <Panel :name="'success_' + index">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                    标题: {{log.title}} <br>
                                    内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </template>
                    </Collapse>
                </Tab-pane>
                <Tab-pane label="通知" name="info">
                    <Collapse v-model="log.info">
                        <template v-for="(log, index) in getLogs('info')">
                            <Panel :name="'info_' + index">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                    标题: {{log.title}} <br>
                                    内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </template>
                    </Collapse>
                </Tab-pane>
                <Tab-pane label="警告" name="warning">
                    <Collapse v-model="log.warning">
                        <template v-for="(log, index) in getLogs('warning')">
                            <Panel :name="'warning_' + index">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                    标题: {{log.title}} <br>
                                    内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </template>
                    </Collapse>
                </Tab-pane>
                <Tab-pane label="错误" name="error">
                    <Collapse v-model="log.error">
                        <template v-for="(log, index) in getLogs('error')">
                            <Panel :name="'error_' + index">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                    标题: {{log.title}} <br>
                                    内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </template>
                    </Collapse>
                </Tab-pane>
            </Tabs>
        </Row>
        <Row type="flex" justify="end" style="margin-top: 10px; line-height: 50px">
            <Col style="margin-right: 20px">
            <div style="font-size: 16px;line-height: 40px;display: inline-block"> 超过100条自动清理？ </div>
            <i-switch v-model="settings.autoClearLogs"></i-switch>
            </Col>
            <Col>
            <Button type="error" @click="settings.logs=[]">清空日志记录</Button>
            </Col>
        </Row>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
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
