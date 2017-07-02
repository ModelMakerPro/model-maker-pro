<template>
    <div>
        <Modal v-model="showModal" v-if="settings" title="系统配置" @on-ok="()=>{showModal = false}" @on-cancel="()=>{showModal = false}">
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
            <Row>
                <h4>日志记录</h4>
                <Tabs value="all">
                    <Tab-pane label="全部" name="all">
                        <Collapse v-model="log.all">
                            <Panel :name="'all_' + index" v-for="(log, index) in getLogs()">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                标题: {{log.title}} <br>
                                内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </Collapse>
                    </Tab-pane>
                    <Tab-pane label="成功" name="success">
                        <Collapse v-model="log.success">
                            <Panel :name="'success_' + index" v-for="(log, index) in getLogs('success')">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                标题: {{log.title}} <br>
                                内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </Collapse>
                    </Tab-pane>
                    <Tab-pane label="通知" name="info">
                        <Collapse v-model="log.info">
                            <Panel :name="'info_' + index" v-for="(log, index) in getLogs('info')">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                标题: {{log.title}} <br>
                                内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </Collapse>
                    </Tab-pane>
                    <Tab-pane label="警告" name="warning">
                        <Collapse v-model="log.warning">
                            <Panel :name="'warning_' + index" v-for="(log, index) in getLogs('warning')">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                标题: {{log.title}} <br>
                                内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
                        </Collapse>
                    </Tab-pane>
                    <Tab-pane label="错误" name="error">
                        <Collapse v-model="log.error">
                            <Panel :name="'error_' + index" v-for="(log, index) in getLogs('error')">
                                时间： {{log.time}} 类型: {{log.type}}
                                <p slot="content">
                                标题: {{log.title}} <br>
                                内容: {{log.desc || log.content}}
                                </p>
                            </Panel>
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
        </Modal>
    </div>
</template>
<style lang="less" scoped>
</style>
<script type="text/ecmascript-6">
  import { openDialog } from '../utils/electron-helper'
  import * as types from '../vuex/mutation-types'
  import * as keys from '../vuex/modules/store-keys'
  import {save} from '../utils/localstorage'
  export default{
    props: {
      value: {
        type: Boolean
      }
    },
    data () {
      return {
        log: {
          all: 'all_1',
          success: 'success_1',
          info: 'info_1',
          warning: 'warning_1'
        },
        showModal: this.value,
        settings: null
      }
    },
    watch: {
      showModal (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.showModal = val
      },
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
//            this.$project.syncToLocalFile(this.$store.getters.projectList, res[0])
          }
        })
      }
    },
    mounted () {
      this.settings = this.clone(this.$store.getters.allSettings)
    }
  }
</script>
