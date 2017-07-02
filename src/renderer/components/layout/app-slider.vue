<template>
    <div id="slider" :style="fullHeight">
        <Menu :active-name="(activeTable && activeTable.id) || $route.query.tableId" @on-select="onTableSelect"
              theme="dark" width="auto">
            <Row type="flex" justify="center" class="code-row-bg">
                <Col span="24" style="text-align: center">
                <div class="logo-warp">
                    <router-link to="/">Model Maker Pro</router-link>
                </div>
                </Col>
                <Col span="24" style="text-align: center">
                <Select class="select-warp" v-model="projectIndex"
                        :not-found-text="projectList.length === 0 ? '请先新增或导入项目' : '请选择项目'">
                    <Option v-if="projectList.length === 0" value="" :key="-1">当前没有项目可用</Option>
                    <Option v-for="(project, index) in projectList" :value="index" :key="index">{{ project.name }}
                    </Option>
                </Select>
                </Col>
                <Col span="24" style="text-align: center;">
                <Row>
                    <i-col :span="12">
                        <Button-group class="btn-group-warp">

                            <Button type="info" shape="circle" @click="showProjectConfigModal = true">
                                <Tooltip content="项目配置">
                                    <Icon size="16" type="wrench"></Icon>
                                </Tooltip>
                            </Button>
                            <Button type="primary" @click.native="goEditor" shape="circle">
                                <Tooltip content="默认字段配置">
                                    <Icon size="16" type="levels"></Icon>
                                </Tooltip>
                            </Button>
                        </Button-group>
                    </i-col>
                    <i-col :span="12">
                        <Button-group class="btn-group-warp">
                            <Button type="primary" shape="circle" @click="addTable">
                                <Tooltip content="添加新表(模型)">
                                    <Icon size="16" type="plus"></Icon>
                                </Tooltip>

                            </Button>
                            <Button type="error" shape="circle" @click="showDeleteConfirm = true">
                                <Tooltip content="删除当前编辑的表">
                                    <Icon size="16" type="trash-b"></Icon>
                                </Tooltip>
                            </Button>
                        </Button-group>
                    </i-col>
                </Row>
                </Col>
            </Row>
            <template v-for="(table, index) in projectTables">
                <Menu-item :name="table.id">
                    <span class="layout-text">{{table.name}} &nbsp;&nbsp;({{table.comment}})</span>
                    <Icon type="edit" @click.native="editTable(table)" style="text-align: right;float: right"></Icon>
                </Menu-item>
            </template>
        </Menu>
        <Modal v-model="showAddModal" title="编辑/新增表" @on-ok="confirmAdd" @on-cancel="()=>{showAddModal = false}">
            <Form :model="table" label-position="right" :label-width="40">
                <Form-item label="表名">
                    <Input v-model="table.name" placeholder="请输入表名"></Input>
                </Form-item>
                <Form-item label="备注">
                    <Input v-model="table.comment" placeholder="请输入表备注"></Input>
                </Form-item>
            </Form>
        </Modal>
        <Modal v-model="showAddModal" title="新增表" @on-ok="confirmAdd" @on-cancel="()=>{showAddModal = false}">
            <Form :model="table" label-position="right" :label-width="40">
                <Form-item label="表名">
                    <Input v-model="table.name" placeholder="请输入表名"></Input>
                </Form-item>
                <Form-item label="备注">
                    <Input v-model="table.comment" placeholder="请输入表备注"></Input>
                </Form-item>
            </Form>
        </Modal>
        <Modal v-model="showDeleteConfirm" title="删除表" @on-ok="delTable" @on-cancel="()=>{showDeleteConfirm = false}">
            确定删除该表 操作无法恢复 请三思？
        </Modal>

        <project-config v-model="showProjectConfigModal"></project-config>
        <table-config v-model="showTableConfigModal"></table-config>
    </div>
</template>
<style lang="less">
    #slider {
        display: block;
        height: 100%;
        overflow: auto;
        .logo-warp, .select-warp, .btn-group-warp {
            margin: 8px auto;
        }
        .logo-warp, .select-warp {
            width: 90%;
            height: 30px;
            background: #5b6270;
            border-radius: 3px;
            .ivu-select {
                width: 100%;
            }
        }
        .select-warp {
            text-align: left;
        }
        .logo-warp {
            color: white;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            a {
                color: white;
                &:hover, &:active, &:focus {
                    color: white;
                }
            }
        }
    }
</style>
<script type="text/ecmascript-6">
  import { save } from '../../utils/localstorage'
  import { PROJECTS_INDEX, ON_EDIT_TABLE_INDEX } from '../../vuex/modules/store-keys'
  import { mapGetters } from 'vuex'
  import * as types from '../../vuex/mutation-types'
  import ProjectConfig from './project-config.vue'
  import TableConfig from './table-config.vue'
  export default{
    components: {
      TableConfig,
      ProjectConfig
    },
    data () {
      return {
        showAddModal: false,
        showDeleteConfirm: false,
        showTableConfigModal: false,
        showProjectConfigModal: false,
        table: {
          name: '',
          comment: '',
          fields: []
        },
        activeTable: null
      }
    },
    methods: {
      goEditor () {
        this.$router.push({name: 'FieldEditor', query: {mode: 'DEFAULT_ROW_SETTING', code: Math.random()}})
      },
      delTable () {
        if (this.onEditTableIndex !== null && this.projectTables[this.onEditTableIndex]) {
          this.$store.commit(types.DELETE_PROJECT_TABLE, this.onEditTableIndex)
          this.$store.commit(types.UPDATE_ON_EDIT_TABLE_INDEX, null)
        }
      },
      addTable () {
        this.table = {
          name: '',
          comment: '',
          fields: []
        }
        this.showAddModal = true
      },
      onTableSelect (id) {
        this.$store.commit(types.UPDATE_ON_EDIT_TABLE_INDEX, id)
        this.$router.push({name: 'FieldEditor', query: {tableId: id, code: Math.random()}})
      },
      editTable () {
        this.showTableConfigModal = true
      },
      confirmAdd () {
        if (!this.table.name || !this.table.comment) {
          this.$Notice.warning({
            title: '新增失败',
            desc: '表名和注释都要填写'
          })
          return
        }
        if (!this.table.id && this.$store.getters.autoAddFieldWhenTableCreate) {
          this.table = Object.assign(this.table, {
            fields: this.$store.getters.onEditProject.defaultFields || []
          })
        }
        this.$store.commit(this.table.id ? types.UPDATE_PROJECT_TABLE : types.ADD_PROJECT_TABLE, this.table)
      }
    },
    watch: {
      onEditTableIndex: {
        deep: true,
        handler (val) {
          save({key: ON_EDIT_TABLE_INDEX, value: val})
        }
      }
    },
    computed: {
      projectIndex: {
        get () {
          return parseInt(this.$store.getters.projectIndex)
        },
        set (val) {
          save({key: PROJECTS_INDEX, value: val})
          this.$store.commit(types.UPDATE_SELECT_INDEX, val)
        }
      },
      ...mapGetters(['projectList', 'projectTables', 'onEditTableIndex'])
    }
  }
</script>
