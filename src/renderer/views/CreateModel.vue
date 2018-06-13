<!--从数据库模型导入生成项目-->
<template>
    <div class="container" :style="contentWarpHeight">
        <Row style="width: 100%">
            <i-col span="12">
                <Form ref="form" :model="config" :rules="validRule" :label-width="100">
                    <Form-item prop="host" label="数据库主机">
                        <i-input type="text" v-model="config.host" placeholder="数据库Ip地址 如: 127.0.0.1">
                        </i-input>
                    </Form-item>
                    <Form-item prop="dbName" label="数据库名">
                        <i-input type="text" v-model="config.dbName" placeholder="请输入数据库名 如: mysql">
                        </i-input>
                    </Form-item>
                    <Form-item prop="user" label="数据库用户名">
                        <i-input type="text" v-model="config.user" placeholder="请输入数据库用户名 如: root">
                        </i-input>
                    </Form-item>
                    <Form-item prop="password" label="数据库密码">
                        <i-input type="password" v-model="config.password" placeholder="请输入数据库密码">
                        </i-input>
                    </Form-item>
                    <Form-item prop="port" label="数据库端口号">
                        <i-input type="text" v-model="config.port" placeholder="端口号 如: 3306">
                        </i-input>
                    </Form-item>

                    <FormItem prop="type" label="项目类型">
                        <Select v-model="config.dbType" placeholder="数据库类型" style="width: 100%">
                            <template v-for="type in dbTypes">
                                <Option :value="type.value">{{type.label}}</Option>
                            </template>
                        </Select>
                    </FormItem>

                    <Form-item label="Model存放路劲">
                        <Row>
                            <i-col span="20">
                                <i-input type="text" disabled :value="config.path" placeholder="请选择项目Model存放路劲">
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
                        <Button style="width: 90px" @click="$router.push({name: 'NewProject'})" type="info">
                            去导入项目
                        </Button>
                    </Form-item>
                </Form>

            </i-col>
            <i-col span="11" offset="1">
                <h4>运行日志</h4>
                <div class="info" v-show="error">
                    <p class="label">Error</p>
                    <p>
                        {{error}}
                    </p>
                </div>
                <div class="info" v-show="stderr">
                    <p class="label">StdErr</p>
                    <p>
                        {{stderr}}
                    </p>
                </div>
                <div class="info" v-show="stdout">
                    <p class="label">StdOut</p>
                    <p>
                        {{stdout}}
                    </p>
                </div>
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

    .info {
        .label {
            font-size: 20px;
            font-weight: 600;
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
  import { openDialog } from '../utils/electron'
  import childProcess from 'child_process'

  export default {
    data () {
      return {
        config: {
          host: '192.168.0.111',
          port: 3306,
          user: 'root',
          dbName: 'yinshang',
          password: '123456',
          dbType: 'mysql',
          path: 'C:\\Users\\Deboy\\Desktop\\demo-model'
        },
        validRule: {
          host: [
            {required: true, message: '请填写项目名', trigger: 'blur'}
          ],
          dbName: [
            {required: true, message: '请输入需要导出的数据库名', trigger: 'change'}
          ],
          user: [
            {required: true, message: '请选择项目类型', trigger: 'change'}
          ]
        },
        dbTypes: [
          {
            label: 'mysql',
            value: 'mysql'
          }
        ],
        error: null,
        stdout: null,
        stderr: null
      }
    },
    computed: {},
    methods: {
      /**
       * 从文件夹中读取Models
       */
      readDBModel () {
        openDialog((res) => {
          if (res && res.length > 0) {
            this.config.path = res[0]
          }
        })
      },
      /**
       * 确认新建项目
       */
      submit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let config = this.config
            let cliStr = `we-sequelize-auto -h ${config.host} -o ${config.path} -p ${config.port} -d ${config.dbName} -u ${config.user} -x ${config.password} -e ${config.dbType} -C`
            console.log(cliStr)
            childProcess.exec(cliStr, {}, (error, stdout, stderr) => {
              console.log('done', error, stdout, stderr)
              if (error || stderr) {
                this.error = error
                this.stderr = stderr
              }
              this.stdout = stdout
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      }
    },
    mounted () {

    }
  }
</script>
