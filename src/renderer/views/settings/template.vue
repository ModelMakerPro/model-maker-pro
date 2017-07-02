<template>
    <div>
        <Form :model="settings" v-if="settings" label-position="top">
            <Form-item label="模版存放文件夹">
                <Row>
                    <Col :span="20">
                    <Input :value="settings.dir" disabled></Input>
                    </Col>
                    <Col :span="4">
                    <Button @click="choseTemplate" style="width: 100%" type="primary">更改</Button>
                    </Col>
                </Row>
            </Form-item>
        </Form>
        <Row style="margin-bottom: 10px">
            <Col :span="10" style="line-height: 30px;">
            <p>模版列表(任何数据异常 请点击右侧 同步模版)</p>
            </Col>
            <Col :span="14" style="line-height: 30px;text-align: right">
            <Button @click="syncTpl" type="success">同步模版</Button>
            </Col>
        </Row>
        <div class="table-area">
            <table v-if="settings && settings.list">
                <thead>
                <tr>
                    <th>模版名</th>
                    <th>路径</th>
                    <th>文件后缀</th>
                    <th>文件首字母大写</th>
                    <th>导出类型</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(tpl, index) in tplList">
                    <td>{{tpl.name}}</td>
                    <td>{{tpl.path}}</td>
                    <td><Input v-model="tpl.suffix" placeholder="导出的文件后缀"></Input></td>
                    <td>
                        <Select v-model="tpl.filenameFormat" style="width:250px">
                            <Option v-for="format in formatList" :value="format.value" :key="format.label">{{ format.label }}</Option>
                        </Select>
                    </td>
                    <td>
                        <Radio-group v-model="tpl.type">
                            <Radio label="list"></Radio>
                            <Radio label="project"></Radio>
                        </Radio-group>
                    </td>
                    <td>
                        <Button type="error" @click="tplList.splice(index, 1)">删除</Button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    .table-area {
        border-right: 1px solid #e3e8ee;
        text-align: center;
        table {
            border: 1px solid #e3e8ee;
            border-bottom: none;
            width: 100%;
            tr {
                border-bottom: 1px solid #e3e8ee;
                &.on-selected {
                    background: #f5f7f9;
                }
                &:last-child {
                    border-bottom: none;
                }
                &:hover {
                    background: #f5f7f9;
                }
                th, td {
                    height: 40px;
                    white-space: nowrap;
                    overflow: hidden;
                    border-right: 1px solid #e3e8ee;
                    border-bottom: 1px solid #e3e8ee;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
<script type="text/ecmascript-6">
  import { openDialog } from '@/utils/electron-helper'
  import * as types from '@/vuex/mutation-types'
  import _ from 'lodash'
  export default{
    data () {
      return {
        settings: null,
        tplList: [],
        formatList: [
          {label: '不作处理', value: ''},
          {label: '首字母大写+驼峰式', value: 'upperFirstAndDashToCamel'},
          {label: '下划线转大写', value: 'dashToCamel'},
          {label: '全小写', value: 'lowerCase'}
        ]
      }
    },
    watch: {
      settings: {
        deep: true,
        handler (val) {
          this.$store.commit(types.UPDATE_TEMPLATE_SETTINGS, this.clone(val))
        }
      },
      tplList: {
        deep: true,
        handler (val) {
          this.$store.commit(types.UPDATE_TEMPLATE_LIST, this.clone(val))
        }
      }
    },
    methods: {
      syncTpl () {
        if (!this.settings.dir) {
          this.$store.dispatch('showNotice', {
            type: 'info',
            title: '请先设置模版存放文件夹'
          })
        }
        let existTpl = []
        this.tplList.forEach(tpl => {
          existTpl.push(tpl.name)
        })
        let tplList = this.$project.listTpl(this.settings.dir)
        tplList.forEach((tpl, index) => {
          // 如果名字相同  就要合并以前的设置
          if (existTpl.indexOf(tpl.name) > -1) {
            tplList[index] = _.merge({}, tpl, this.tplList[existTpl.indexOf(tpl.name)])
          }
        })
        this.$store.commit(types.MERGE_TEMPLATE_LIST, tplList)
        this.tplList = this.clone(this.$store.getters.templateList)
        this.$store.dispatch('showNotice', {
          type: 'success',
          title: '同步成功',
          desc: ' 同步模版数量: ' + tplList.length
        })
      },
      choseTemplate () {
        openDialog(res => {
          if (res && res.length > 0) {
            this.$set(this.settings, 'dir', res[0])
            this.syncTpl()
          }
        })
      }
    },
    mounted () {
      this.settings = this.clone(this.$store.state.template)
      this.tplList = this.clone(this.$store.getters.templateList) || []
    }
  }
</script>
