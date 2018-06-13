<!--从数据库模型导入生成项目-->
<template>
    <div class="container" :style="contentWarpHeight">
        <Row style="width: 100%">
            <i-col span="12">
                <Form ref="projectForm" :model="project" :rules="projectRule" :label-width="100">
                    <Form-item prop="name" label="项目名称">
                        <i-input type="text" v-model="project.name" placeholder="请输入项目名称">
                        </i-input>
                    </Form-item>
                    <FormItem prop="type" label="项目类型">
                        <Select v-model="project.type" placeholder="请选择项目类型(语言/框架)" style="width: 100%">
                            <template v-for="type in projectTypes">
                                <Option :value="type">{{type}}</Option>
                            </template>
                        </Select>
                    </FormItem>
                    <Form-item prop="importFormExistModel" label="已有Model">
                        <i-switch v-model="project.importFormExistModel"></i-switch>
                    </Form-item>
                    <Form-item label="Model路劲" v-show="project.importFormExistModel">
                        <Row>
                            <i-col span="20">
                                <i-input type="text" disabled :value="modelPath" placeholder="请选择项目Model存放路劲">
                                </i-input>
                            </i-col>
                            <i-col span="3" offset="1">
                                <Button type="info" @click.native="readDBModel">选择</Button>
                            </i-col>
                        </Row>
                    </Form-item>
                    <Form-item label="">
                        <Button style="width: 90px" @click="submit" type="info">
                            提交
                        </Button>
                    </Form-item>
                    <p class="tips">
                        <span style="color: red">注意事项</span><br>
                        如果你已经使用了 we-sequelize-auto 或者 sequelize-auto 将你的现有项目的数据库 Model 导出至某个文件夹 <br>
                        <router-link :to="{name: 'CreateModel'}">请点击此处导出项目数据库的 Model</router-link>
                        <br>
                        那么可以将 已有Model 这一项打钩<br>
                        然后选择你Model存放的目录,导入相应的项目<br>
                        如果没有则属于新增项目,直接填写项目名称和类型即可提交创建项目
                        如果你不清楚怎么导入现有项目 <br>
                        请查看此帮助文档:
                        <router-link :to="{name: 'Helper', query:{id: 'how-to-create-project-form-existing-db'}}">
                            如何为一个已存在的数据库创建项目
                        </router-link>
                    </p>
                </Form>

            </i-col>
            <i-col span="11" offset="1" v-show="project.importFormExistModel">
                <h4>Model信息概览</h4>
                <ul class="table-list">
                    <li v-for="table in tables" class="table-item">
                        <h2>{{table.name}}</h2>
                        表格字段列表: <span class="field" v-for="field in table.fields">{{field.field}} </span>
                    </li>
                </ul>
            </i-col>
        </Row>
    </div>
</template>
<style scoped lang="less">
    .table-list {
        .table-item {
            margin-bottom: 10px;
            .field {
                margin-left: 2px;
            }
        }
    }

    .tips {
        color: #666;
        line-height: 1.5;
        margin-left: 30px;
        font-size: 14px;
    }
</style>
<script type="text/ecmascript-6">
  import * as SQLHelper from '../services/sql'
  import { openDialog } from '../utils/electron'
  import * as types from '../store/mutation-types'
  import projectConfigs from '../project-configs'

  export default {
    data () {
      return {
        project: {
          name: '',
          type: '',
          importFormExistModel: false
        },
        projectRule: {
          name: [
            {required: true, message: '请填写项目名', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择项目类型', trigger: 'change'}
          ]
        },
        modelPath: '',
        tables: []
      }
    },
    computed: {
      projectTypes () {
        let typeList = []
        Object.keys(projectConfigs).forEach(key => {
          typeList.push(key)
        })
        return typeList
      },
      projectConfig () {
        return projectConfigs[this.project.type]
      },
      tablesAfterTransform () {
        return this.tables.map(table => {
          table.fields = table.fields.map((field) => {
            return Object.assign({}, this.projectConfig.fields, field)
          })
          return table
        })
      }
    },
    methods: {
      /**
       * 从文件夹中读取Models
       */
      readDBModel () {
        openDialog((res) => {
          if (res && res.length > 0) {
            this.modelPath = res[0]
            this.tables = SQLHelper.transform(res[0])
          }
        })
      },
      /**
       * 确认新建项目
       */
      submit () {
        if (this.project.importFormExistModel && (!this.tables || this.tables.length === 0)) {
          this.$Message.info('未检测到项目 Model 文件 如果不是已存在数据库的项目请勿勾选 已有在Model 如果是 请点击底部的帮助链接')
          return
        }
        this.$refs.projectForm.validate((valid) => {
          if (valid) {
            this.$store.commit(types.ADD_PROJECT, Object.assign({}, this.project, {config: this.projectConfig}))
            this.$store.commit(types.UPDATE_SELECT_INDEX, this.$store.getters.projectList.length - 1)
            for (let index = 0, len = this.tablesAfterTransform.length; index < len; index++) {
              let table = this.tablesAfterTransform[index]
              this.$store.commit(types.ADD_PROJECT_TABLE, table)
            }
            this.$Message.info('新建项目成功')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      }
    }
  }
</script>
