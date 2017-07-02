<template>
    <div>
        <div class="tips">请注意 自动保存功能已去除 切换表编辑之前记得按下 Ctrl+S 或 Ctrl+Shift+S 保存 否则会丢失数据 返回上一步按下：Ctrl+Z</div>
        <Row type="flex">
            <Col span="18" class="table-area" :style="contentWarpHeight">
            <table>
                <thead>
                <tr>
                    <th>位置</th>
                    <th>标题</th>
                    <th>字段</th>
                    <th>类型</th>
                    <th>关联表</th>
                    <th>展示字段</th>
                    <th>下拉选项</th>
                    <th>排序</th>
                    <th>显示</th>
                    <th>编辑</th>
                    <th>必填</th>
                </tr>
                </thead>
                <tbody>
                <tr :class="{'on-selected': index === onEditIndex}" v-for="(item, index) in fields"
                    @click="changeRow(index)">
                    <td colspan="1" style="text-align: center;width: 50px">
                        <span style="margin-right: 10px;cursor: pointer" @click.prevent="movePosition('down', index)">
                            <Icon size="20" type="arrow-down-c"></Icon>
                        </span>
                        <span style="cursor: pointer" @click.prevent="movePosition('up', index)">
                            <Icon size="20" type="arrow-up-c"></Icon>
                        </span>
                    </td>
                    <td colspan="1">
                        <template v-if="index === onEditIndex">
                            <Input v-model="item.title"></Input>
                        </template>
                        <template v-else>
                            {{item.title}}
                        </template>
                    </td>
                    <td colspan="1">
                        <template v-if="index === onEditIndex">
                            <Input v-model="item.field"></Input>
                        </template>
                        <template v-else>
                            {{item.field}}
                        </template>
                    </td>
                    <td colspan="1" style="width: 140px">
                        <template v-if="index === onEditIndex">
                            <Select v-model="item.xtype">
                                <Option v-for="(type, index2) in typeList" :value="type.value" :key="index2">
                                    {{ type.label}}
                                </Option>
                            </Select>
                        </template>
                        <template v-else>
                            {{getRelValue(item.xtype, typeList, 'value', 'label')}}
                        </template>
                    </td>
                    <td colspan="1" style="width: 100px">
                        <template v-if="index === onEditIndex">
                            <Select v-model="item.relTable">
                                <Option v-for="(tab, index3) in tableList" :value="tab.id" :key="index3">{{ tab.name }}
                                </Option>
                            </Select>
                        </template>
                        <template v-else>
                            {{getRelValue(item.relTable, tableList, 'id', 'name')}}
                        </template>
                    </td>
                    <td colspan="1">
                        <template v-if="index === onEditIndex">
                            <Input v-model="item.displayField" placeholder="可以用js对象的写法"></Input>
                        </template>
                        <template v-else>
                            {{item.displayField}}
                        </template>
                    </td>
                    <td colspan="1">
                        <template v-if="index === onEditIndex">
                            <Input v-model="item.customFilter" placeholder="0:保密;1:男;2:女"></Input>
                        </template>
                        <template v-else>
                            {{item.customFilter}}
                        </template>
                    </td>
                    <td colspan="1" style="padding: 0 5px;">
                        <i-switch v-model="item.sort"></i-switch>
                    </td>
                    <td colspan="1" style="padding: 0 5px;">
                        <i-switch v-model="item.isShow"></i-switch>
                    </td>
                    <td colspan="1" style="padding: 0 5px;">
                        <i-switch v-model="item.edit"></i-switch>
                    </td>
                    <td colspan="1" style="padding: 0 5px;">
                        <i-switch v-model="item.required"></i-switch>
                    </td>
                </tr>
                </tbody>
            </table>
            </Col>
            <Col span="6" :style="contentWarpHeight">
            <template v-if="onEditIndex!==null && onEditRow && attrs">
                <template v-for="(attr, attrKey) in attrs">
                    <h3 style="padding: 10px;">{{attrKey}} 属性
                        <Icon style="float: right;cursor: pointer;" @click.native="openAddPropsModel(attrKey)" size="20"
                              type="plus-round"></Icon>
                    </h3>
                    <template v-for="(prop, key) in onEditRow[attrKey]">
                        <multi-type-input v-model="prop.value" :label="prop.name" :type="prop.type"
                                          :options="prop.optionKey ? options[prop.optionKey] : []"
                                          @on-remove="removeCustomProps(attrKey, key)"
                                          :is-custom="prop.isCustom"></multi-type-input>
                    </template>
                </template>
            </template>
            </Col>
        </Row>
        <Row>
            <Col :span="4">
            <Button type="primary" @click="addRow">添加字段</Button>
            </Col>
            <Col :span="14" style="text-align: right;">
            <Button type="error" v-show="onEditIndex!==null && onEditIndex!==''" @click="removeRow">
                删除选中行({{onEditRow && onEditRow.title}})
            </Button>
            </Col>
        </Row>
        <props-add v-model="propsAdd.show" @on-confirm="insertProps" :name="propsAdd.type"></props-add>
    </div>
</template>
<style lang="less" scoped>
    .tips {
        color: red;
        font-size: 14px;
    }

    .table-area {
        border-right: 1px solid #e3e8ee;
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
                    text-align: center;
                }
            }
        }
    }
</style>
<script type="text/ecmascript-6">
  import * as types from '../vuex/mutation-types'
  import { getDefaultRow } from '../config/tool'
  import MultiTypeInput from 'components/multi-type-input'
  import { clone, moveDown, moveUp, insert } from '../utils/helper'
  import PropsAdd from 'components/props-add'
  import DropDownOptionKeys from '../config/dropdown-select-config'
  export default{
    components: {
      MultiTypeInput,
      PropsAdd
    },
    data () {
      return {
        options: DropDownOptionKeys,
        onEditRow: null,
        onEditIndex: null,
        fields: [],
        attrs: [],
        propsAdd: {
          show: false,
          title: ''
        },
        typeList: [
          {
            value: 'text',
            label: '文字'
          },
          {
            value: 'textarea',
            label: '文本框'
          },
          {
            value: 'select',
            label: '下拉选择'
          },
          {
            value: 'number',
            label: '数字'
          },
          {
            value: 'datetime',
            label: '日期+时间'
          },
          {
            value: 'img',
            label: '单图'
          },
          {
            value: 'imgs',
            label: '多图'
          },
          {
            value: 'html',
            label: 'html内容'
          },
          {
            value: 'date',
            label: '日期(2017-01-01)'
          },
          {
            value: 'time',
            label: '时间(23:00:00)'
          }
        ]
      }
    },
    watch: {
      onEditIndex (val) {
        this.$set(this, 'onEditRow', this.fields[val])
      },
      onEditRow: 'updateAttrs'
    },
    computed: {
      tableList () {
        let empty = [
          {
            id: '',
            name: '无关联'
          }
        ]
        let list = clone(this.$store.getters.projectTables) || []
        list.forEach((table) => {
          // 删除关联表 防止无限循环的关联 导致卡死
          table.fields.forEach(field => {
            delete field.relTable
          })
        })
        return empty.concat(list)
      }
    },
    methods: {
      updateAttrs (field) {
        let attrs = {}
        if (field) {
          Object.keys(field).forEach(attr => {
            if (field[attr] instanceof Object) {
              attrs[attr] = field[attr]
            }
          })
        }
        this.attrs = attrs
      },
      watchKeyDown (e) {
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey && !e.shiftKey)) {
          e.preventDefault()
          this.save()
        }
        if (e.keyCode === 46) {
          if (window.confirm('确认删除该行字段？')) {
            this.removeRow()
          }
        }
        if (e.keyCode === 38 || e.keyCode === 40) {
          this.changeSelectRow(e.keyCode === 38 ? 'UP' : 'DOWN')
        }
      },
      getRelValue (val, list, key, label) {
        let relLabel = ''
        list.forEach(item => {
          if (item[key] === val) {
            relLabel = item[label]
            return true
          }
        })
        return relLabel
      },
      removeCustomProps (type, key) {
        this.$delete(this.onEditRow[type], key)
      },
      insertProps (form) {
        this.$set(this.onEditRow[this.propsAdd.type], form.key, form)
      },
      openAddPropsModel (type) {
        this.$set(this, 'propsAdd', {
          show: true,
          type: type
        })
      },
      movePosition (direction, index) {
        if (direction === 'up') {
          moveUp(this.fields, index)
        } else {
          moveDown(this.fields, index)
        }
      },
      addRow () {
        insert(this.fields, this.onEditIndex + 1, clone(getDefaultRow(this.$store.getters.onEditProject.type)))
        this.changeRow(this.onEditIndex + 1)
      },
      removeRow () {
        this.fields.splice(this.onEditIndex, 1)
        this.onEditIndex = this.fields.length > 0 ? 0 : null
      },
      changeSelectRow (direction) {
        if (direction === 'UP' && this.onEditIndex !== 0) {
          this.onEditIndex--
        } else if (this.onEditIndex < this.fields.length - 1) {
          this.onEditIndex++
        } else {
          this.addRow()
        }
      },
      changeRow (index) {
        this.onEditIndex = index
      },
      save (notice = true) {
        if (this.$store.getters.onEditTableIndex !== null && this.$store.getters.projectList.length > 0 && !(this.$route.query.mode === 'DEFAULT_ROW_SETTING')) {
          this.$store.commit(types.UPDATE_PROJECT_TABLE, Object.assign({}, this.$store.getters.onEditTable, {fields: clone(this.fields)}))
        } else {
          this.$store.commit(types.UPDATE_PROJECT, Object.assign({}, this.$store.getters.onEditProject, {defaultFields: clone(this.fields)}))
        }
        if (notice) {
          this.$store.dispatch('showNotice', '保存成功')
        }
      },
      reload () {
        window.location.reload()
      },
      setFields () {
        if (this.$route.query.mode === 'DEFAULT_ROW_SETTING') {
          this.fields = clone((this.$store.getters.onEditProject && this.$store.getters.onEditProject.defaultFields) || [])
        } else {
          this.fields = clone((this.$store.getters.onEditTable && this.$store.getters.onEditTable.fields) || [])
        }
      }
    },
    activated () {
      this.setFields()
      window.document.addEventListener('keydown', this.watchKeyDown, false)
    },
    beforeRouteUpdate (to, from, next) {
      next()
      this.onEditIndex = null
      this.setFields()
    },
    deactivated () {
      window.document.removeEventListener('keydown', this.watchKeyDown)
    }
  }
</script>
